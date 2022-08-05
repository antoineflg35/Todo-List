<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;


class TaskController extends Controller
{


    private $validationRules = [
        'title' => 'required|max:128',
        'completion' => 'required|integer|between:0,100',
        'categoryId' => 'required|integer|exists:categories,id'

    ];


    public function list()
    {

        $task = Task::all()->load('category');
        return response()->json($task);
    }

    public function item($id){

        $task = Task::findOrFail($id);
        return response()->json($task);
    }

     public function store(Request $request){

        $this->validate($request, $this->validationRules);

        $task = new Task;

        $task->title = $request->input('title');
        $task->completion = $request->input('completion');
        $task->status = $request->input('status');
        $task->category_id = $request->input('categoryId');

        $task->save();


        if($task){

            $task->load('category');
            return response()->json($task, 201);
        } else {
            return abort(500, 'error custom');
        }
    }



    public function editTask(Request $request, $id)
    {

        $taskToUpdate = Task::findOrFail($id);

        if($request->isMethod('put')) {

            $this->validate($request, $this->validationRules);


            $taskToUpdate->title = $request->input('title');
            $taskToUpdate->completion = $request->input('completion');
            $taskToUpdate->status = $request->input('status');
            $taskToUpdate->category_id = $request->input('categoryId');

        } else if ($request->isMethod('patch')){


            if ($request->hasAny(['title', 'completion', 'status', 'categoryId']) == false) {
                abort(400, 'Il faut au moins un champ !');
            }

            if($request->filled('title')) {
                $taskToUpdate->title = $request->input('title');
            }
      
            if($request->filled('status')) {
                $taskToUpdate->status = $request->input('status');
            }
            if($request->filled('completion')) {
                $taskToUpdate->completion = $request->input('completion');
            }
            if($request->filled('categoryId')) {
                $taskToUpdate->category_id = $request->input('categoryId');
            }
        }


        if($taskToUpdate->save()) {
            return response()->json('', 201);
        } else {
            abort(500);
        }
    }

    public function delete($id){
        $task = Task::find($id);

        $task->delete();

        if ($task){
          return response()->json($task, 204);
        }
      }
}

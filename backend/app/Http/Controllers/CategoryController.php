<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{


    public function list()
    {
        $categories = Category::all();


        return response()->json($categories);
    }

    /**
     * @param int $id
     * @return void
     */
    public function item($id)
    {

      $category = Category::findOrFail($id);
      return response()->json($category);

    }

}

<?php

use App\Todo;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return 'Welcome to the Hackathon Project API!';
});

/**
* Get all todos
*/
$router->get('todos', function()
{
    $todos = Todo::orderBy('created_at', 'DESC')->paginate(5)->toArray();
    $remaining = Todo::where('completed', 0)->count();
    return ['todos' => $todos, 'remaining' => $remaining];
});
/**
* Create todo
*/
$router->post('add-todo', function(Request $request)
{
    Todo::create($request->all());
});
/**
* Delete todo
*/
$router->post('todos/delete/{id}', function($id)
{
    Todo::destroy($id);
});
/**
* Complete todo
*/
$router->post('todos/complete/{id}/{completed}', function($id, $completed)
{
    Todo::where('id', $id)->update(['completed' => $completed]);
});
/**
* Update todo
*/
$router->post('update/{id}', function(Request $request, $id)
{
    Todo::where('id', $id)->update([
        'name' => $request->input('name'),
        'description' => $request->input('description'),
        'completed' => $request->input('completed')
    ]);
});

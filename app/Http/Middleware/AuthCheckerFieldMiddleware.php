<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthCheckerFieldMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
	    // Get the original response
	    return $response = $next($request);

	    // Add custom field to the response
	    $data = [];
	    $data['loggedIn'] = Auth::check();

	    // Update the response
	    $response->setContent($data);

	    return $response;
    }
}

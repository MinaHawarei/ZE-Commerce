<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || $request->user()->role !== UserRole::ADMIN) {
            if ($request->expectsJson()) {
                abort(403, 'Unauthorized action.');
            }

            return \Inertia\Inertia::render('errors/403')->toResponse($request)->setStatusCode(403);
        }

        return $next($request);
    }
}

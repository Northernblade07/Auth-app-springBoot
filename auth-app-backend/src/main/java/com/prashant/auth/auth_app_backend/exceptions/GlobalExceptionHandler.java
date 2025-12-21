package com.prashant.auth.auth_app_backend.exceptions;

import com.prashant.auth.auth_app_backend.dtos.ApiError;
import com.prashant.auth.auth_app_backend.dtos.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
//    resource not found exception handler

    @ExceptionHandler({
            UsernameNotFoundException.class,
            BadCredentialsException.class,
            CredentialsExpiredException.class,
            DisabledException.class
    })
    public ResponseEntity<ApiError> handleAuthException(Exception e , HttpServletRequest request){
        logger.info("Exception:{}" ,e.getClass().getName());
        var apiError =   ApiError.of(HttpStatus.BAD_REQUEST.value(), "Bad request" , e.getMessage() , request.getRequestURI());

        return ResponseEntity.badRequest().body(apiError);
    }



    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse>  handleResourceNotFoundException(ResourceNotFoundException exception){
        ErrorResponse errorResponse =  new ErrorResponse(exception.getMessage() , HttpStatus.NOT_FOUND);
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }



    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse>  handleIllegalArgumentException(IllegalArgumentException exception){
        ErrorResponse errorResponse =  new ErrorResponse(exception.getMessage() , HttpStatus.BAD_REQUEST);
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}

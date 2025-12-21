package com.prashant.auth.auth_app_backend.security;

import com.prashant.auth.auth_app_backend.helpers.UserHelper;
import com.prashant.auth.auth_app_backend.repositories.UserRepository;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private Logger logger  = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        logger.info("Authorization Header : {}", header);
        if(header != null  && header.startsWith("Bearer ")){

//            token extraction and then validation and then authentication is created and then set it inside securityContext

            String token = header.substring(7);

//            check for AccessToken
            if(!jwtService.isAccessToken(token)){
                filterChain.doFilter(request , response);
                return;
            }

            try{

                Jws<Claims> parse = jwtService.parse(token);

                Claims  payload =  parse.getPayload();

                String userId = payload.getSubject();
                String jti = payload.getId();

                UUID uuid = UserHelper.parseUUID(userId);
                userRepository.findById(uuid).ifPresent(
                        user ->{
//                            check for user enabled or not
                         if(user.isEnabled()){

//                            we have user from database
                            List<GrantedAuthority> authorities = user.getRoles()==null? List.of(): user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

                            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                    user.getEmail(),
                                    null,
                                    authorities
                            );

                            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

//                            set the authentication created inside the SecurityContext below
                            if(SecurityContextHolder.getContext().getAuthentication()==null){
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            }
                         }
                        }
                );


            } catch (ExpiredJwtException e){
                request.setAttribute("error" , "Token Expired");
                e.printStackTrace();
            } catch (MalformedJwtException e){
                request.setAttribute("error" , "Invalid token");
                e.printStackTrace();
            } catch (JwtException e){
                request.setAttribute("error" , "Invalid Token");
                e.printStackTrace();
            } catch (Exception e){
                request.setAttribute("error" , "Invalid token");
                e.printStackTrace();
            }

        }

        filterChain.doFilter(request , response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().startsWith("/api/v1/auth");
    }
}

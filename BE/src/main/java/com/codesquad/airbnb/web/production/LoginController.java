package com.codesquad.airbnb.web.production;

import com.codesquad.airbnb.business.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.net.URI;
import java.net.URISyntaxException;

@Controller
public class LoginController {

    private static final Logger log = LoggerFactory.getLogger(LoginController.class);

    private LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@PathParam("code") String code,
                                        HttpServletResponse response) throws URISyntaxException {
        log.debug("{}", code);

        Cookie cookie = new Cookie("jwt", loginService.parseJWTFromGithubAccount(code));
        cookie.setMaxAge(60 * 60 * 3);
        response.addCookie(cookie);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(new URI("/"));

        return new ResponseEntity<>("로그인 성공",
                headers,
                HttpStatus.MOVED_PERMANENTLY);
    }
}

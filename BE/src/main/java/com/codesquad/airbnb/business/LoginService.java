package com.codesquad.airbnb.business;

import com.codesquad.airbnb.common.security.GithubToken;
import com.codesquad.airbnb.common.utils.JWTUtils;
import com.codesquad.airbnb.dao.UserMapper;
import com.codesquad.airbnb.domain.model.User;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class LoginService {

    private static final Logger log = LoggerFactory.getLogger(LoginService.class);

    private UserMapper userMapper;

    @Value("${github.oauth.client.id}")
    private String CLIENTID;

    @Value("${github.oauth.client.secret}")
    private String CLIENTSECRET;

    @Value("${github.oauth.access_token.uri}")
    private String GITHUB_ACCESS_TOKEN_URI;

    @Value("${github.oauth.scope.user.email.uri}")
    private String GITHUB_USER_EMAIL_URI;

    private static final String JWT_PAYLOAD = "email";

    public LoginService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public String parseJWTFromGithubAccount(String code) {
        GithubToken githubToken = getAccessToken(code);
        User loginUser = new User(getUserEmailFromOAuthToken(githubToken));
        saveUserIfNotExist(loginUser);
        return parseJWTByUser(loginUser);
    }

    public User getUserFromJWT(String token) {
        User loginUser = new User(JWTUtils.getStringFromJWT(JWT_PAYLOAD, token));
        loginUser = userMapper.findByEmail(loginUser);

        log.debug("logined User: {}", loginUser);
        
        return loginUser;
    }

    private GithubToken getAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> payload = new HashMap<>();
        payload.put("code", code);
        payload.put("client_id", CLIENTID);
        payload.put("client_secret", CLIENTSECRET);

        ResponseEntity<GithubToken> response = new RestTemplate().postForEntity(GITHUB_ACCESS_TOKEN_URI,
                new HttpEntity<>(payload, headers),
                GithubToken.class);

        return response.getBody();
    }

    private String getUserEmailFromOAuthToken(GithubToken githubToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(githubToken.getAccessToken());

        ResponseEntity<JsonNode> response = new RestTemplate().exchange(GITHUB_USER_EMAIL_URI,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                JsonNode.class);

        return Objects.requireNonNull(response.getBody()).findValue("email").asText();
    }

    private void saveUserIfNotExist(User loginUser) {
        if (userMapper.findByEmail(loginUser) == null) {
            userMapper.insertUser(loginUser);
        }
    }

    private String parseJWTByUser(User user) {
        return JWTUtils.createTokenByString(JWT_PAYLOAD, user.getEmail());
    }
}

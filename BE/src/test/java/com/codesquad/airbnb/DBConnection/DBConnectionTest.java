package com.codesquad.airbnb.DBConnection;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.fail;

@SpringBootTest
public class DBConnectionTest {

    @Value("${spring.datasource.driver-class-name}")
    private String driver;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String userName;

    @Value("${spring.datasource.password}")
    private String password;

    @Test
    public void DB연결() throws ClassNotFoundException {
        Class.forName(driver);
        try(Connection con = DriverManager.getConnection(url, userName, password)) {
        } catch (SQLException e) {
            e.printStackTrace();
            fail("DB 연결 실패");
        }
    }
}

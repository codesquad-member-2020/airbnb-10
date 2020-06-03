DROP TABLE IF EXISTS booking;

CREATE TABLE booking (
    id INT AUTO_INCREMENT,
    user INT,
    accommodation INT,
    check_in DATE,
    check_out DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES user(id),
    FOREIGN KEY (accommodation) REFERENCES accommodation(id)
);

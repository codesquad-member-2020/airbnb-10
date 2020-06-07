DROP TABLE IF EXISTS booking;

CREATE TABLE booking (
    id INT AUTO_INCREMENT,
    user INT NOT NULL,
    accommodation INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES user(id),
    FOREIGN KEY (accommodation) REFERENCES accommodation(id)
);

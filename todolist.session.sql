CREATE TABLE todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task varchar(255) NOT NULL,
    completed BOOL NOT NULL,
)
# Drawer

This is a demo that parses an **extremely** simple drawing language and draws
lines on the screen.

## Example Script

Alter `transform` function to change the scaling and orientation.
Currently puts the origin at the bottom left and divides the space into steps of 50

```
START
Go to 0, 0
Pen Down
Go to 10, 10
Pen Up
STOP
```

```
START
Go to 5, 0
Pen Down
Go to 10, 5
Go to 5, 10
Go to 0, 5
Go to 5, 0
Pen Up
Go to 7, 7
Pen Down
Go to 3, 3
Pen Up
Go to 3, 7
Pen Down
Go to 7, 3
STOP
```

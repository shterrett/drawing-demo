# Drawer

This is a demo that parses an **extremely** simple drawing language and draws
lines on the screen.

## Example Script

Alter `transform` function to change the scaling and orientation.
Currently puts the origin at the bottom left and divides the space into steps of 15

```
START
Go to 0, 0
Pen Down
Go to 33.333333, 33.333333
Pen Up
END
```

```
START
Go to 16.66667, 0
Pen Down
Go to 33.333333, 16.66667
Go to 16.66667, 33.333333
Go to 0, 16.66667
Go to 16.66667, 0
Pen Up
Go to 23.33333, 23.33333
Pen Down
Go to 10, 10
Pen Up
Go to 10, 23.33333
Pen Down
Go to 23.33333, 10
END
```

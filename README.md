# limm

---
## TODO:
  - [ ] OPTIMIZE CODE
     - [X] refactor the code to avoid using Vectors. **Done, but other p5 functions are still used**
     - [X] optimize the collision system. **Done, but still needs optimization**
  - [X] FIGURE DELTA TIME
     - [X] read about fixedUpdate and optimizing games in js
  - [X] CHANGE TO TILES
     - [X] research what mechanic was used in platformers like VVVVVV and some JS based ones. **Tile-based (Type 2) is the most common one**
     - [X] choose the size of a tile. **64x64 pixels**
     - [X] create a map class. **Done, but we need a way of handling the change of maps**
     - [X] rebuild the wall class. **The Wall class is deleted**
     - [X] rebuild the test map using tile. **Done, but needs more different tiles**
     - [X] rewrite the collision system to use tiles. **OK, but not pixel-perfect and player can still stuck**
  - [ ] CLEAN UP, REFACTOR, TEST
     - [ ] refactor the code
     - [X] move Player into a separate class
     - [ ] rewrite all constant values as constants
     - [ ] make the constants variable (different movers will have different speed etc.)
     - [ ] test
  - [ ] IF succeeded, merge with master

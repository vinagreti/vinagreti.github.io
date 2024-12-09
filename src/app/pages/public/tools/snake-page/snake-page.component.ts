import { NgFor, NgStyle } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
} from "@angular/core";
import { ReplaySubject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";

export enum TILE_CONTENT {
  FREE = "gray",
  SNAKE_BODY = "green",
  SNAKE_HEAD = "yellow",
  SNAKE_TAIL = "orange",
  FOOD = "blue",
}

export enum MOVEMENT_DIRECTION {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
}

@Component({
  selector: "app-snake-page",
  standalone: true,
  imports: [NgStyle, NgFor, PageWrapperComponent],
  templateUrl: "./snake-page.component.html",
  styleUrl: "./snake-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakePageComponent implements OnInit {
  boardSize = signal(20);

  snakeSize = signal(3);

  tiles = signal<TILE_CONTENT[]>([]);

  private movementStream$ = new ReplaySubject<MOVEMENT_DIRECTION>(1);

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key as MOVEMENT_DIRECTION;
    this.movementStream$.next(key);
  }

  constructor() {
    this.watchUserKeysAndMove();
  }

  ngOnInit() {
    this.initTiles();
  }

  trackByFn(_index: number, item: string) {
    return item;
  }

  private generateInitialTilesList(): TILE_CONTENT[] {
    const totalSize = this.boardSize() ** 2;
    const freeTilesList = (new Array(totalSize - this.snakeSize())).fill(
      TILE_CONTENT.FREE,
    );
    const snakeTilesList = [
      TILE_CONTENT.SNAKE_TAIL,
      ...(new Array(this.snakeSize() - 2)).fill(
        TILE_CONTENT.SNAKE_BODY,
      ),
      TILE_CONTENT.SNAKE_HEAD,
    ];
    const tilesListWithSnake = [...snakeTilesList, ...freeTilesList];
    return tilesListWithSnake;
  }

  private initTiles() {
    const tiles = this.generateInitialTilesList();
    this.tiles.set(tiles);
  }

  private watchUserKeysAndMove() {
    this.movementStream$.pipe(takeUntilDestroyed()).subscribe(
      (movement) => {
        switch (movement) {
          case MOVEMENT_DIRECTION.UP:
            return this.moveUp();
          case MOVEMENT_DIRECTION.DOWN:
            return this.moveDown();
          case MOVEMENT_DIRECTION.LEFT:
            return this.moveLeft();
          case MOVEMENT_DIRECTION.RIGHT:
            return this.moveRight();
        }
      },
    );
  }

  private moveUp() {
    console.log("moveUp");
    const tiles = this.tiles();
  }

  private moveDown() {
    console.log("moveDown");
    const tiles = this.tiles();
  }

  private moveLeft() {
    console.log("moveLeft");
    const tiles = this.tiles();
    const snakeHeadIndex = tiles.indexOf(TILE_CONTENT.SNAKE_HEAD);
    const snakeTailIndex = tiles.indexOf(TILE_CONTENT.SNAKE_TAIL);
    const nextHeadIndex = snakeHeadIndex - 1;
    // move head
    tiles[nextHeadIndex] = TILE_CONTENT.SNAKE_HEAD;
    // remove tail
    tiles[snakeTailIndex] = TILE_CONTENT.FREE;
    // update tiles
    this.tiles.set(tiles);
  }

  private moveRight() {
    console.log("moveRight");
    const tiles = this.tiles();
    const snakeHeadIndex = tiles.indexOf(TILE_CONTENT.SNAKE_HEAD);
    const snakeTailIndex = tiles.indexOf(TILE_CONTENT.SNAKE_TAIL);
    const nextHeadIndex = snakeHeadIndex + 1;
    const nextTailIndex = snakeTailIndex + 1;
    debugger;
    // move head
    tiles[nextHeadIndex] = TILE_CONTENT.SNAKE_HEAD;
    // remove tail
    tiles[snakeTailIndex] = TILE_CONTENT.FREE;
    // add new tail
    tiles[nextTailIndex] = TILE_CONTENT.SNAKE_TAIL;
    // update body
    for (let i = snakeTailIndex + 2; i < nextHeadIndex; i++) {
      tiles[i] = TILE_CONTENT.SNAKE_BODY;
    }
    // update tiles
    this.tiles.set(tiles);
  }
}

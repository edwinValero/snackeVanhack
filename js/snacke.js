class Snacke {
  constructor() {
    this.snacke = [];
    this.snacke.push({ x: 25 * box, y: 25 * box });
    this.snacke.push({ x: 24 * box, y: 25 * box });
  }

  setHeadPosition(x, y) {
    this.snacke.pop();
    this.snacke.unshift({ x, y });
  }

  moveSnacke() {
    this.snacke.pop();
    const oldPosition = this.snacke[0];
    const newPosition = {
      x: oldPosition.x + direction.x,
      y: oldPosition.y + direction.y
    };
    this.snacke.unshift(newPosition);
  }

  growUp() {
    const oldPosition = this.snacke[0];
    const newPosition = {
      x: oldPosition.x + direction.x,
      y: oldPosition.y + direction.y
    };
    this.snacke.unshift(newPosition);
  }

  eatFood(food) {
    if (
      food.special &&
      this.snacke[0].x < food.x + 20 &&
      this.snacke[0].x > food.x - 20 &&
      this.snacke[0].y < food.y + 20 &&
      this.snacke[0].y > food.y - 20
    ) {
      score += 9;
      this.growUp();
      this.growUp();
      return true;
    } else if (this.snacke[0].x === food.x && this.snacke[0].y === food.y) {
      score++;
      this.growUp();
      return true;
    }
    return false;
  }

  getSnacke() {
    return this.snacke;
  }
}

export const snacke = new Snacke();
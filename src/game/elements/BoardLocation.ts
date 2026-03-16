/**
 * Description: BoardLocation represents a location
 * on the game board at the row index and column index
 * specified by member fields row and col respectively.
 *
 * @export
 * @class BoardLocation
 * @typedef {BoardLocation}
 */
export class BoardLocation {
    constructor(
        private row: number,
        private col: number,
    ) {}

    getRow(): number {
        return this.row;
    }

    getCol(): number {
        return this.col;
    }

    setRow(row: number): void {
        this.row = row;
    }

    setCol(col: number): void {
        this.col = col;
    }
}

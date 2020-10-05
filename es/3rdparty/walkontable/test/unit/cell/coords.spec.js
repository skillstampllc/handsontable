import CellCoords from 'walkontable/cell/coords';
describe('CellCoords', function () {
  describe('normalize()', function () {
    it('should normalize negative coordinates', function () {
      var coords = new CellCoords(-2, -1);
      coords.normalize();
      expect(coords.row).toBe(0);
      expect(coords.col).toBe(0);
    });
    it('should not normalize `null` coordinates (leave as it is)', function () {
      var coords = new CellCoords();
      coords.normalize();
      expect(coords.row).toBe(null);
      expect(coords.col).toBe(null);
    });
  });
  describe('clone()', function () {
    it('should clone the object', function () {
      var coords = new CellCoords(3, 9);
      var clone = coords.clone();
      expect(coords.row).toBe(clone.row);
      expect(coords.col).toBe(clone.col);
      expect(coords).not.toBe(clone);
    });
  });
});
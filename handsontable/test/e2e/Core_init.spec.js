describe('Core_init', () => {
  const id = 'testContainer';

  beforeEach(function() {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function() {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should respect startRows and startCols when no data is provided', () => {
    spec().$container.remove();
    spec().$container = $(`<div id="${id}"></div>`).appendTo('body');
    handsontable();

    expect(countRows()).toEqual(5); // as given in README.md
    expect(countCols()).toEqual(5); // as given in README.md
  });

  it('should construct when container is not appended to document', () => {
    spec().$container.remove();
    handsontable();
    expect(getData()).toBeTruthy();
  });

  it('should create an instance when the iframe is a container', () => {
    const iframe = $('<iframe/>').appendTo(spec().$container);
    const doc = iframe[0].contentDocument;

    doc.open('text/html', 'replace');
    doc.write(`
      <!doctype html>
      <head>
        <link type="text/css" rel="stylesheet" href="../dist/handsontable.full.min.css">
      </head>`);
    doc.close();

    const container = $('<div/>').appendTo(doc.body);

    expect(() => {
      container.handsontable({});
      container.handsontable('destroy');
    }).not.toThrow();
  });

  it('should create table even if is launched inside custom element', () => {
    const onErrorSpy = spyOn(window, 'onerror');

    spec().$container.remove();
    spec().$container = $(`<hot-table><div id="${id}"></div></hot-table>`).appendTo('body');

    handsontable();

    const cell = spec().$container.find('tr:eq(0) td:eq(1)');

    mouseOver(cell);
    mouseDown(cell);

    expect(onErrorSpy).not.toHaveBeenCalled();
  });

  it('should rerender the table after changing the `display` property to anything other than `none` on the root' +
    ' element if it was initialized with `display: none` with inline styles', async() => {
    const initialDisplayValue = spec().$container.css('display');

    spec().$container.css('display', 'none');

    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      colHeaders: true,
    });

    // Make sure the table is not visible.
    expect(hot.rootElement.offsetParent).toEqual(null);

    spec().$container.css('display', initialDisplayValue);

    await sleep(100);

    const $topHolderElement = getTopClone().find('.wtHolder');
    const $testTopHeader = $(hot.getCell(-1, 0, true));

    expect($topHolderElement.height()).toBeGreaterThanOrEqual($testTopHeader.height());
  });

  it('should rerender the table after changing the `display` property to anything other than `none` on the root' +
    ' element\'s parent if it was initialized with `display: none` with inline styles', async() => {
    const $testParentContainer = $('<div id="test-parent-container"></div>');

    $('body').append($testParentContainer);

    spec().$container.detach();

    $testParentContainer.append(spec().$container);

    $testParentContainer.css('display', 'none');

    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      colHeaders: true,
    });

    // Make sure the table is not visible.
    expect(hot.rootElement.offsetParent).toEqual(null);

    $testParentContainer.css('display', 'block');

    await sleep(100);

    const $topHolderElement = getTopClone().find('.wtHolder');
    const $testTopHeader = $(hot.getCell(-1, 0, true));

    expect($topHolderElement.height()).toBeGreaterThanOrEqual($testTopHeader.height());

    spec().$container.detach();
    $('body').append(spec().$container);
    $testParentContainer.remove();
  });

  it('should rerender the table after changing the `display` property to anything other than `none` on the root' +
    ' element if it was initialized with `display: none` using the stylesheet', async() => {
    const $style = $('<style>#test-hot {display: none;}</style>').appendTo('head');

    spec().$container.attr('id', 'test-hot');

    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      colHeaders: true,
    });

    // Make sure the table is not visible.
    expect(hot.rootElement.offsetParent).toEqual(null);

    spec().$container.css('display', 'block');

    await sleep(100);

    const $topHolderElement = getTopClone().find('.wtHolder');
    const $testTopHeader = $(hot.getCell(-1, 0, true));

    expect($topHolderElement.height()).toBeGreaterThanOrEqual($testTopHeader.height());

    $style.remove();
  });

  it('should rerender the table after changing the `display` property to anything other than `none` on the root' +
    ' element\'s parent if it was initialized with `display: none` with a stylesheet', async() => {
    const $style = $('<style>#test-parent-container {display: none;}</style>').appendTo('head');
    const $testParentContainer = $('<div id="test-parent-container"></div>');

    $('body').append($testParentContainer);

    spec().$container.detach();

    $testParentContainer.append(spec().$container);

    $testParentContainer.css('display', 'none');

    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      colHeaders: true,
    });

    // Make sure the table is not visible.
    expect(hot.rootElement.offsetParent).toEqual(null);

    $testParentContainer.css('display', 'block');

    await sleep(100);

    const $topHolderElement = getTopClone().find('.wtHolder');
    const $testTopHeader = $(hot.getCell(-1, 0, true));

    expect($topHolderElement.height()).toBeGreaterThanOrEqual($testTopHeader.height());

    spec().$container.detach();
    $('body').append(spec().$container);
    $testParentContainer.remove();
    $style.remove();
  });
});

class Axes {
  public static draw(middleX: number, middleY: number, translateToMiddle = true, footer = 'by Inspiro Club', axisColor = 'lightgrey', textSize = 20, tickSize = 10, tickStep = 50, textShift = 1.6) {
    push();
    noStroke();
    textFont('System', textSize);
    stroke(axisColor);
    fill(axisColor);
    strokeWeight(1);
    line(middleX, 0, middleX, height);
    line(0, middleY, width, middleY);
    translate(middleX, middleY);

    //X axis
    for (let x = tickStep; x < width - middleX; x += tickStep) {
      textAlign(CENTER, TOP);
      line(x, -tickSize, x, +tickSize);
      text(x, x, tickSize * textShift);
      textAlign(CENTER, BOTTOM);
      line(-x, -tickSize, -x, tickSize);
      text(-x, -x, -tickSize * textShift);
      push();
      for (let y = tickStep; y < height - middleY; y += tickStep) {
        strokeWeight(2);
        point(x, y);
        point(-x, y);
        point(x, -y);
        point(-x, -y);
      }
      pop();
    }

    for (let y = tickStep; y < height - middleY; y += tickStep) {
      textAlign(LEFT, CENTER)
      line(-tickSize, -y, +tickSize, -y);
      text(y, tickSize * textShift, y + textSize);
      textAlign(RIGHT, CENTER)
      line(-tickSize, y, tickSize, y);
      text(-y, -tickSize * textShift, -y);
    }
    textAlign(CENTER, TOP)
    if (middleX) {
      //do not want to show X/Y in case of default display
      text('X', width - middleX - tickSize * textShift - textSize / 2, -tickSize * textShift * textShift - textSize / 2);
    }
    textAlign(CENTER, TOP)
    if (middleY) {
      //do not want to show X/Y in case of default display
      text('Y', +tickSize * textShift + textSize / 2, -middleY + textSize / 2);
    }
    textAlign(CENTER, BOTTOM)
    noStroke();
    text(footer, width - middleX - textWidth(footer), height - middleY - textSize);
    pop();
    if (translateToMiddle) {
      translate(middleX, middleY);
    }
  }
}

const cvs = document.querySelector('canvas[id=test');
const c = cvs.getContext('2d');

class Line {
  constructor(begin=[0,0], end) {
    self.begin = begin
    self.end = end
  }

  draw() {
    c.beginPath()
    c.moveTo(self.begin[0], self.begin[1])
    c.lineTo(self.end[0], self.end[1])
    c.stroke()
  }

}

window.addEventListener('load', () => {
  console.log('loaded')
  console.log(cvs.width, c.height)
  line =  new Line([0,0], [cvs.width, 333])
  line.draw()
})
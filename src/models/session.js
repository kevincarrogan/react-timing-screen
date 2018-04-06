class Session {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.currentTime = 0;
  }

  start() {
    setInterval(
      () => {
        this.currentTime += 1;
      },
      1000,
    );
  }
}

export default Session;

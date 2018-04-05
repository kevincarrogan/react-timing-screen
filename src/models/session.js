class Session {
  constructor(name) {
    this.name = name;
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

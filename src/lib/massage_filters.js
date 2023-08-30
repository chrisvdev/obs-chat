class MessageFilters {
  constructor() {
    this.filters = []
  }

  addFilter(cb) {
    this.filters.push(cb)
  }

  mustBeFiltered(message) {
    return !this.filters.reduce((prev, cb) => {
      const res = cb(message)
      // console.log(`${cb.name} -> ${res}`)
      return res || prev
    }, false)
  }
}

const messageFilters = new MessageFilters()

export default messageFilters

export function Log() {
  return function (target: any) {
    const className = target.name

    Object.getOwnPropertyNames(target.prototype).forEach((methodName) => {
      const originalMethod = target.prototype[methodName]

      if (typeof originalMethod === "function") {
        target.prototype[methodName] = function (...args: any[]) {
          // console.log(
          //   `Вызов метода ${className}.${methodName} с аргументами:`,
          //   args
          // )
          console.log(`Вызов метода ${className}.${methodName}`)
          const result = originalMethod.apply(this, args)
          // console.log(
          //   `Результат работы метода ${className}.${methodName}:`,
          //   result
          // )
          return result
        }
      }
    })
  }
}

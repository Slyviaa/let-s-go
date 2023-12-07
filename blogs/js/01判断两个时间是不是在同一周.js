function judgeDateInSameWeek (d1,d2){
  const weekTimeStamp = 7*24*60*60*1000
  const timeStamp = Math.abs(new Date(d1).getTime() - new Date(d2).getTime() )
  const day1 = new Date(d1).getDay() || 7
  const day2 = new Date(d2).getDay() ||7
  if(d1 === d2){
    return true
  }else if(timeStamp >weekTimeStamp){
    return false
  }else {
    if(d1>d2){
      return day1>day2
    }else{
      return day1<day2
    }
  }
}
console.log(judgeDateInSameWeek('2023-10-26','2023-10-26'))
console.log(judgeDateInSameWeek('2023-10-26','2023-10-23'))
console.log(judgeDateInSameWeek('2023-10-26','2023-10-29'))
console.log(judgeDateInSameWeek('2023-10-26','2023-10-22'))
console.log(judgeDateInSameWeek('2023-10-26','2023-10-19'))
console.log(judgeDateInSameWeek('2023-10-26','2023-11-01'))
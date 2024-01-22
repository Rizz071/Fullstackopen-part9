interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (arr: number[], target: number): Result => {

    const sum_hours: number = arr.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)


    const periodLength: number = arr.length
    const trainingDays: number = arr.filter(day => day !== 0).length

    const average: number = sum_hours / arr.length

    const success: boolean = average >= target


    let rating: number
    switch (true) {
        case average === 0:
            rating = 0
        case average < target:
            rating = 1
        case average > target:
            rating = 2
    }

    let ratingDescription: string
    switch (rating) {
        case 0:
            ratingDescription = 'too bad'

        case 1:
            ratingDescription = 'not too bad'

        case 2:
            ratingDescription = 'very good'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average

    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

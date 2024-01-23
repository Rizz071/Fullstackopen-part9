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
            break
        case average < target:
            rating = 1
            break
        case average > target:
            rating = 2
            break
        default:
            rating = 0
    }

    let ratingDescription: string
    switch (rating) {
        case 0:
            ratingDescription = 'too bad'
            break

        case 1:
            ratingDescription = 'not too bad'
            break

        case 2:
            ratingDescription = 'very good'
            break
        default:
            ratingDescription = 'error occured!'
            break
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

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))


console.log('Parsing command line...')

try {
    [...process.argv.slice(3)].forEach(elem => {
        console.log(Number(elem))

        if (isNaN(Number(elem))) {
            throw new Error('At least one is not a number!')
        }

        const target: number = Number(process.argv[3])
        console.log('\nTarget: ', target)

        const overall_days_amount = Number(process.argv.slice(4).length)
        console.log('\nOverall days amount: ', overall_days_amount)

        const days_array: number[] = []
        for (let i = 4; i < 4 + overall_days_amount; i++) {
            days_array.push(Number(process.argv[i]))
        }
        console.log('\nDays overall: ', days_array)


        console.log('\n\nResult object: ', calculateExercises(days_array, target))
    })
}
catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Eror occured! ', error)
    }
}





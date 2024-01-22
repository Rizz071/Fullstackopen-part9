

const calculateBmi = (height: number, weight: number): string => {
    const BMI: number = weight / ((height * 0.01) ** 2)

    switch (true) {
        case BMI < 16:
            return 'Underweight (Severe thinness)'
        case BMI >= 16 && BMI <= 16.9:
            return 'Underweight (Moderate thinness)'
        case BMI >= 17 && BMI <= 18.4:
            return 'Underweight (Mild thinness)'
        case BMI >= 18.5 && BMI <= 24.9:
            return 'Normal range'
        case BMI >= 25 && BMI <= 29.9:
            return 'Overweight (Pre-obese)'
        case BMI >= 30 && BMI <= 34.9:
            return 'Obese (Class I)'
        case BMI >= 35 && BMI <= 39.9:
            return 'Obese (Class II)'
        case BMI >= 40:
            return 'Obese (Class III)'
    }
}

let height: number
let weight: number

try {
    if (isNaN(Number(process.argv[3])) || isNaN(Number(process.argv[4]))) {
        throw new Error('Not a numbers!')
    } else {
        height = Number(process.argv[3])
        weight = Number(process.argv[4])

        console.log(calculateBmi(height, weight))
    }
}
catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Eror occured! ', error)
    }
}



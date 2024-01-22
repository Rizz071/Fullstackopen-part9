

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


console.log(calculateBmi(180, 74))
console.log(calculateBmi(165, 74))

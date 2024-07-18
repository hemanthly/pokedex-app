export const genderFromGenderRate = (genderRate:number)=>{
    switch (genderRate) {
        case 0:
          return ['male'];
        case 8:
          return ['female'];
        case -1:
          return ['genderless'];
        default:
          return ['male', 'female'];
      }
}
// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
    const directors = [];        // This will hold the final array of directors
    const seenDirectors = new Set();  // Set to track directors that have been added
  
    // Loop through the original array of movies
    for (let i = 0; i < movies.length; i++) {
        const director = movies[i].director;  // Get the director of the current movie
    
        // If the director has not been seen before, add it to the array
        if (!seenDirectors.has(director)) {
        directors.push(director);
        seenDirectors.add(director); // Mark the director as seen
        } else {
            // If the director has already been added, insert `null` to maintain the same length
            directors.push(null);
        }
    }
  
    return directors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
    // Filter the movies array to get only the drama movies directed by Steven Spielberg
    const spielbergDramaMovies = movies.filter(movie => 
        movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
  
    // Return the number of filtered movies
    return spielbergDramaMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
    // If the array is empty, return 0
    if (movies.length === 0) {
        return 0;
    }

    // Use reduce to sum up all the scores
    const totalScore = movies.reduce((sum, movie) => sum + (movie.score || 0), 0);
  
    // Calculate the average score and round it to 2 decimal places
    const averageScore = (totalScore / movies.length).toFixed(2);
    // .toFixed(2) to round the average score to two decimal places. 
        
    //The result is a string, so we use parseFloat() to convert it back into a number.
    return parseFloat(averageScore);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
    // Filter the movies to get only the ones with "Drama" in the genre array
    const dramaMovies = movies.filter(movie => movie.genre.includes("Drama"));
  
    // If no drama movies, return 0
    if (dramaMovies.length === 0) {
        return 0;
    }

    // Use reduce to sum up the scores of the filtered drama movies
    const totalScore = dramaMovies.reduce((sum, movie) => sum + (movie.score || 0), 0);

    // Calculate the average score and round it to 2 decimal places
    const averageScore = (totalScore / dramaMovies.length).toFixed(2);

    // Return the rounded average score as a number
    return parseFloat(averageScore);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
    // Clone the array using slice() or spread operator to avoid modifying the original array
    const orderedMovies = [...movies];

    // Sort the array by year, and then by title alphabetically
    orderedMovies.sort((a, b) => {
        // First compare by year
        if (a.year !== b.year) {
            return a.year - b.year;
    }
    
    // If years are the same, sort by title alphabetically
    return a.title.localeCompare(b.title);
  });

  // Return the sorted cloned array
  return orderedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
    // Clone the array to avoid modifying the original one
    const clonedMovies = [...movies];

    // Sort the array alphabetically by title
    clonedMovies.sort((a, b) => a.title.localeCompare(b.title));

    // Get the first 20 titles
    const top20Titles = clonedMovies.slice(0, 20).map(movie => movie.title);

    return top20Titles;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
    // Clone the array to avoid modifying the original one
    const minutesMovies = [...movies];

    // Loop through each movie in the cloned array
    minutesMovies.forEach(movie => {
        // Extract the duration string (e.g., "2h 22min")
        const durationString = movie.duration;

        // Use regular expressions to match the hours and minutes in the duration string
        const hoursMatch = durationString.match(/(\d+)h/); // Matches the hours (e.g., "2h")
        const minutesMatch = durationString.match(/(\d+)min/); // Matches the minutes (e.g., "22min")

        // Initialize hours and minutes to 0
        let hours = 0;
        let minutes = 0;

        // If hours are found, convert them to minutes
        if (hoursMatch) {
            hours = parseInt(hoursMatch[1], 10); // Get the number from the "2h" part
        }

        // If minutes are found, get the number of minutes
        if (minutesMatch) {
            minutes = parseInt(minutesMatch[1], 10); // Get the number from the "22min" part
        }

        // Set the duration in minutes (hours converted to minutes + minutes)
        movie.duration = hours * 60 + minutes;
    });

    // Return the cloned array with updated durations
    return minutesMovies;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {

    // 1: Check if the array is empty, return null in that case
    if (movies.length === 0) {
        return null;
    }


    // 2: Group movies by year
    const groupedByYear = movies.reduce((moviesByYear, movie) => {
    const year = movie.year;
    const score = movie.score;
    
    if (score) {
        // If the year is not already in the accumulator, create an array for it
        if (!moviesByYear[year]) {
            moviesByYear[year] = [];
        }
        // Push the score to the array for that year
        moviesByYear[year].push(score);
    }
    
    return moviesByYear;
    }, {});


    // 3: Calculate the average score for each year
    let bestYear = '';
    let bestAverageScore = 0;

    Object.keys(groupedByYear).forEach(year => {
        const scores = groupedByYear[year];
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    

    // 4: Check if this year has the best average score
    // If the current year's average is higher, or if it's the same but the year is older
    if (averageScore > bestAverageScore || (averageScore === bestAverageScore && year < bestYear)) {
        bestAverageScore = averageScore;
        bestYear = year;
      }
    });


    // 5: Return the result in the desired format
    return `The best year was ${bestYear} with an average score of ${bestAverageScore.toFixed(2)}`;
}


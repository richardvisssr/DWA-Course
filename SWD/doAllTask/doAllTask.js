/* A */

let doAllTasks = (printWhenFinished) => {
    setTimeout(() => {
        console.log('Taak 1 klaar');
        setTimeout(() => {
            console.log('Taak 2 klaar');
            printWhenFinished();
        }, Math.random() * 100);
    }, Math.random() * 100);    
};

/* B */

let printWhenFinished = () => {
    console.log('Alle taken klaar');
    console.log('nu gaan we andere dingen doen');
};

doAllTasks(printWhenFinished);

/* C */

let doAllTasks2 = (taskDone) => {
    let completedTasks = [];
    setTimeout(() => {
        completedTasks.push('Taak 1 klaar');
        setTimeout(() => {
            completedTasks.push('Taak 2 klaar');
            taskDone(completedTasks);
        }, Math.random() * 100);
    }, Math.random() * 100);    
}; 


/* D */
let printResults = (resultList) => {
    console.log('Alle taken klaar, dit zijn de resultaten');
    resultList.forEach((result) => {
        console.log(result);
    });
};

doAllTasks2(printResults);
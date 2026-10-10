

export class timeFormatter{

    constructor(){}

    toAO(time:string){
       
        const plainTime = new Date(time);
        const timeFormatted = new Intl.DateTimeFormat('pt-AO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
        }).format(plainTime);

        return timeFormatted;
    }
}
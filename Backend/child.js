

let temp=[];

for(let i=0;i<7;i++){
    temp[i]=[]
    for(let j=0;j<7;j++){
        temp[i][j]={x:i,y:j};
    }
}

for(let i=0;i<7;i++){
    for(let j=0;j<7;j++){
        console.log("(",temp[i][j].x,",",temp[i][j].y,")")
    }
}
let count=0;
const CreateTree=(record,parrent_id="")=>{
  const tree=[];
        record.forEach((item)=>{
            if(item.parrent_id===parrent_id){
                count++;
                const newItem=item;
                newItem.index=count;
                const children=CreateTree(record,newItem.id)
                if(children.length>0){
                    newItem.children=children;
                }
                tree.push(newItem);
            }
        });
        return tree;
}
module.exports.tree=(record,parrent_id="")=>{
   count=0;
   const tree=CreateTree(record,parrent_id="");
   return tree;
}
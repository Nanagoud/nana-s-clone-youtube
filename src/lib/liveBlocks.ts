import {Liveblocks} from "@liveblocks/node"


const key = process.env.LIVEBLOCKS_SECRET_KEY
if(!key){
    throw new Error('LIVEBLOCKS_SECRET_KEY is not defined')
}
export const liveBlocks = new Liveblocks({
   secret: key
})

export default liveBlocks;
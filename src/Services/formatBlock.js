export const formatBlock = (block) => {
    return block.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
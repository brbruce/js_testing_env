// Generate a grid of colored boxes, with each box colored one of 3 colors.

const generateNodes = ({
  // Pass in an object literal like "{numberOfColumns: 2, numberOfRows: 3}"
  numberOfColumns,
  numberOfRows,
}) => (
  // Implicit return of single statement, so no "{}" or "return" required.
  Array(
    numberOfColumns * numberOfRows
  )
  .fill()
  .map((
    item,
    index,
  ) => ({
    colorId: (
      Math
      .floor(
        Math.random() * 3
      )
    ),
    id: index,
    x: index % numberOfColumns, // x is the columns, so get the modulus
    y: Math.floor(index / numberOfColumns), // y is the row, so get the whole number of index/numCols.
  }))
)

//const myArr = generateNodes({numberOfColumns: 2, numberOfRows: 3});
//console.log(myArr);

const getNodeAtLocation = ({
  nodes,
  x: requiredX,
  y: requiredY,
}) => (
    (
      nodes
        .find(({
          x,
          y,
        }) => (
            x === requiredX
            && y === requiredY
          ))
      || {}
    )
      .id
  )

const colors = [
  'red',    // 0
  'yellow', // 1
  'blue'    // 2
]

const addAdjacencies1 = (
  nodes,
) => (
    nodes
      .map(({
        colorId,
        id,
        x,
        y,
      }) => ({
        color: colors[colorId],
        eastId: (
          getNodeAtLocation({
            nodes,
            x: x + 1,
            y,
          })
        ),
        id,
        northId: (
          getNodeAtLocation({
            nodes,
            x,
            y: y - 1,
          })
        ),
        southId: (
          getNodeAtLocation({
            nodes,
            x,
            y: y + 1,
          })
        ),
        westId: (
          getNodeAtLocation({
            nodes,
            x: x - 1,
            y,
          })
        ),
      }))
      .map(({
        color,
        id,
        eastId,
        northId,
        southId,
        westId,
      }) => ({
        adjacentIds: (
          [
            eastId,
            northId,
            southId,
            westId,
          ]
            .filter((
              adjacentId,
            ) => (
                adjacentId !== undefined
              ))
        ),
        color,
        id,
      }))
  )

const addAdjacencies2 = (
  nodes,
) => (
    nodes
      .map(({
        colorId,
        id,
        x,
        y,
      }) => ({
        adjacentIds: (
          nodes
            .filter(({
              x: adjacentX,
              y: adjacentY,
            }) => (
                adjacentX === x + 1
                && adjacentY === y
                || (
                  adjacentX === x - 1
                  && adjacentY === y
                )
                || (
                  adjacentX === x
                  && adjacentY === y + 1
                )
                || (
                  adjacentX === x
                  && adjacentY === y - 1
                )
              ))
            .filter(({
              colorId: adjacentColorId,
            }) => (
                adjacentColorId
                === colorId
              ))
            .map(({
              id,
            }) => (
                id
              ))
        ),
        color: colors[colorId],
        id,
      }))
      .filter(({
        adjacentIds,
      }) => (
          adjacentIds
            .length > 0
        ))
  )

const arr1 = generateNodes({ numberOfColumns: 3, numberOfRows: 2 });
console.log(arr1);
//console.log(getNodeAtLocation({ nodes: arr1, x: 1, y: 2 }));
const arr2 = addAdjacencies2(arr1);
console.log(arr2);



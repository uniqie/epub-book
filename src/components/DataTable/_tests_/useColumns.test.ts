import { expect, jest, test } from "@jest/globals"
import useColumns from "../hooks/useColumns"

const testColumns = [
  {
    title: "name",
    code: "name",
    children: [
      {
        title: "A",
        code: "A",
        children: [
          {
            title: "demo1",
            code: "demo1",
          },
          {
            title: "demo2",
            code: "demo2",
          },
        ],
      },
      {
        title: "B",
        code: "B",
      },
    ],
  },
  {
    title: "location",
    code: "location",
    children: [
      {
        title: "demo1",
        code: "demo1",
      },
      {
        title: "demo2",
        code: "demo2",
      },
    ],
  },
  {
    title: "pag",
    code: "pag",
  },
]

const result = [
  [
    [
      {
        title: "name",
        code: "name",
        children: [
          {
            title: "A",
            code: "A",
            children: [
              {
                title: "demo1",
                code: "demo1",
                depth: 2,
                colSpan: 1,
                headAttributes: { rowSpan: 1 },
              },
              {
                title: "demo2",
                code: "demo2",
                depth: 2,
                colSpan: 1,
                headAttributes: { rowSpan: 1 },
              },
            ],
            headAttributes: { colSpan: 2, rowSpan: 1 },
          },
          {
            title: "B",
            code: "B",
            depth: 1,
            colSpan: 1,
            headAttributes: { rowSpan: 2 },
          },
        ],
        headAttributes: { colSpan: 3, rowSpan: 1 },
      },
      {
        title: "location",
        code: "location",
        children: [
          {
            title: "demo1",
            code: "demo1",
            depth: 1,
            colSpan: 1,
            headAttributes: { rowSpan: 2 },
          },
          {
            title: "demo2",
            code: "demo2",
            depth: 1,
            colSpan: 1,
            headAttributes: { rowSpan: 2 },
          },
        ],
        headAttributes: { colSpan: 2, rowSpan: 1 },
      },
      {
        title: "pag",
        code: "pag",
        depth: 0,
        colSpan: 1,
        headAttributes: { colSpan: 1, rowSpan: 3 },
      },
    ],
    [
      {
        title: "A",
        code: "A",
        children: [
          {
            title: "demo1",
            code: "demo1",
            depth: 2,
            colSpan: 1,
            headAttributes: { rowSpan: 1 },
          },
          {
            title: "demo2",
            code: "demo2",
            depth: 2,
            colSpan: 1,
            headAttributes: { rowSpan: 1 },
          },
        ],
        headAttributes: { colSpan: 2, rowSpan: 1 },
      },
      {
        title: "B",
        code: "B",
        depth: 1,
        colSpan: 1,
        headAttributes: { rowSpan: 2 },
      },
      {
        title: "demo1",
        code: "demo1",
        depth: 1,
        colSpan: 1,
        headAttributes: { rowSpan: 2 },
      },
      {
        title: "demo2",
        code: "demo2",
        depth: 1,
        colSpan: 1,
        headAttributes: { rowSpan: 2 },
      },
    ],
    [
      {
        title: "demo1",
        code: "demo1",
        depth: 2,
        colSpan: 1,
        headAttributes: { rowSpan: 1 },
      },
      {
        title: "demo2",
        code: "demo2",
        depth: 2,
        colSpan: 1,
        headAttributes: { rowSpan: 1 },
      },
    ],
  ],
  [
    {
      title: "demo1",
      code: "demo1",
      depth: 2,
      colSpan: 1,
      headAttributes: { rowSpan: 1 },
    },
    {
      title: "demo2",
      code: "demo2",
      depth: 2,
      colSpan: 1,
      headAttributes: { rowSpan: 1 },
    },
    {
      title: "B",
      code: "B",
      depth: 1,
      colSpan: 1,
      headAttributes: { rowSpan: 2 },
    },
    {
      title: "demo1",
      code: "demo1",
      depth: 1,
      colSpan: 1,
      headAttributes: { rowSpan: 2 },
    },
    {
      title: "demo2",
      code: "demo2",
      depth: 1,
      colSpan: 1,
      headAttributes: { rowSpan: 2 },
    },
    {
      title: "pag",
      code: "pag",
      depth: 0,
      colSpan: 1,
      headAttributes: { colSpan: 1, rowSpan: 3 },
    },
  ],
]

test("columns as result", () => {
  expect(JSON.stringify(useColumns(testColumns))).toBe(JSON.stringify(result))
})

---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [Empty (type alias)](#empty-type-alias)
- [Model](#model)
  - [Graph (type alias)](#graph-type-alias)
- [Utils](#utils)
  - [InsertEdge (type alias)](#insertedge-type-alias)
  - [InsertNode (type alias)](#insertnode-type-alias)

---

# Constructors

## Empty (type alias)

TODO

**Signature**

```ts
export type Empty<C extends Config> = InternalEmpty<C>
```

Added in v1.0.0

# Model

## Graph (type alias)

**Signature**

```ts
export type Graph<C extends Config = Config> = InternalGraph<C>
```

Added in v1.0.0

# Utils

## InsertEdge (type alias)

TODO

**Signature**

```ts
export type InsertEdge<
  EI extends G['config']['edgeId'],
  E extends G['config']['edge'],
  NIA extends G['config']['nodeId'],
  NIB extends G['config']['nodeId'],
  G extends Graph
> = InternalInsertEdge<EI, E, NIA, NIB, G>
```

Added in v1.0.0

## InsertNode (type alias)

TODO

**Signature**

```ts
export type InsertNode<
  NI extends G['config']['nodeId'],
  N extends G['config']['node'],
  G extends Graph
> = InternalInsertNode<NI, N, G>
```

Added in v1.0.0

/** @since 1.0.0 */

import { pipe } from 'fp-ts/function'
import * as TM from 'ts-typelevel-map'

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Model
 */
export type Graph<C extends Config = Config> = InternalGraph

type InternalGraph<C extends Config = Config> = {
  config: C
  nodes: TM.Map<C['nodeId'], C['node']>
  edges: TM.Map<C['edgeId'], C['edge']>
  connections: TM.Map<Connection<C['nodeId'], C['nodeId']>, C['edgeId'][]>
} & GraphBrand

type GraphBrand = { readonly Graph: unique symbol }

type MkGraph<G extends Omit<Graph, 'Graph'>> = G & GraphBrand

type Connection<A, B> = { from: A; to: B }

type Config = {
  cyclic: boolean
  directed: boolean
  multiEdge: boolean
  nodeId: any
  node: any
  edgeId: any
  edge: any
}

type MkConfig<C extends Config> = C

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type SetCyclic<B extends boolean, G extends Graph> = MkGraph<{
  config: MkConfig<{
    cyclic: B
    directed: G['config']['directed']
    multiEdge: G['config']['multiEdge']
    nodeId: G['config']['nodeId']
    node: G['config']['node']
    edgeId: G['config']['edgeId']
    edge: G['config']['edge']
  }>
  nodes: G['nodes']
  edges: G['edges']
  connections: G['connections']
}>

type CyclicGraph<C extends CyclicConfig = CyclicConfig> = Graph<C>

type CyclicConfig = Omit<Config, 'cyclic'> & { cyclic: true }

type InternalEmpty<C extends Config> = MkGraph<{
  config: C
  nodes: TM.Empty<C['nodeId'], C['node']>
  edges: TM.Empty<C['edgeId'], C['edge']>
  connections: TM.Empty<Connection<C['nodeId'], C['nodeId']>, C['edgeId'][]>
}>

type InternalInsertNode<
  NI extends G['config']['nodeId'],
  N extends G['config']['node'],
  G extends Graph
> = TM.Insert<NI, N, G['nodes']> extends infer result
  ? result extends TM.Map<G['config']['nodeId'], G['config']['node']>
    ? MkGraph<{
        config: G['config']
        nodes: result
        edges: G['edges']
        connections: G['connections']
      }>
    : result
  : never

type CheckExistence<
  NIA extends G['config']['nodeId'],
  NIB extends G['config']['nodeId'],
  G extends Graph
> = true

type InsertEdge_<
  EI extends G['config']['edgeId'],
  E extends G['config']['edge'],
  NIA extends G['config']['nodeId'],
  NIB extends G['config']['nodeId'],
  G extends CyclicGraph
> = CheckExistence<NIA, NIB, G> extends false
  ? TM.Insert<EI, E, G['edges']> extends infer result
    ? result extends TM.Map<G['config']['edgeId'], G['config']['edge']>
      ? MkGraph<{
          config: G['config']
          nodes: G['nodes']
          edges: result
          connections: G['connections']
        }>
      : 'err edge id exists'
    : never
  : 'err edge exists'

type HasCycle<NI extends G['config']['nodeId'], G extends Graph> = true

type InternalInsertEdge<
  EI extends G['config']['edgeId'],
  E extends G['config']['edge'],
  NIA extends G['config']['nodeId'],
  NIB extends G['config']['nodeId'],
  G extends Graph
> = InsertEdge_<EI, E, NIA, NIB, SetCyclic<true, G>> extends infer draft
  ? draft extends SetCyclic<true, G>
    ? G['config']['cyclic'] extends false
      ? HasCycle<NIA, draft> extends true
        ? 'err has cycle'
        : SetCyclic<false, draft>
      : draft
    : draft
  : never

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * TODO
 *
 * @since 1.0.0
 * @category Constructors
 */
export type Empty<C extends Config> = InternalEmpty<C>

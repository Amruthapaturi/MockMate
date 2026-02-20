// Comprehensive Question Templates - 100+ unique combinations per topic
// Total: 700+ questions across 7 topics (DSA, OS, DBMS, CN, OOPS, Python, Web Development)

export interface QuestionTemplate {
  template: string;
  variables: Record<string, string[]>;
  mustHaveGen: (vars: Record<string, string>) => string[];
  bonusGen: () => string[];
}

export interface TopicTemplates {
  easy: QuestionTemplate[];
  medium: QuestionTemplate[];
  hard: QuestionTemplate[];
}

export const templates: Record<string, TopicTemplates> = {
  dsa: {
    easy: [
      {
        template: "Explain the time complexity of {algorithm} and why it is {characteristic}.",
        variables: {
          algorithm: ["binary search", "linear search", "bubble sort", "insertion sort", "selection sort", "counting sort", "jump search", "interpolation search"],
          characteristic: ["efficient", "used in practice", "suitable for small datasets", "easy to implement", "preferred for nearly sorted data", "optimal for specific use cases"]
        },
        mustHaveGen: (vars) => {
          const complexities: Record<string, string[]> = {
            "binary search": ["o(log n)", "logarithmic", "sorted", "divide"],
            "linear search": ["o(n)", "linear", "sequential", "simple"],
            "bubble sort": ["o(n^2)", "quadratic", "swap", "adjacent"],
            "insertion sort": ["o(n^2)", "quadratic", "shift", "sorted portion"],
            "selection sort": ["o(n^2)", "quadratic", "minimum", "swap"],
            "counting sort": ["o(n+k)", "linear", "non-comparison", "count array"],
            "jump search": ["o(√n)", "root n", "block", "jump"],
            "interpolation search": ["o(log log n)", "probe", "uniform", "calculated position"]
          };
          return complexities[vars.algorithm] || ["complexity", "time", "efficient"];
        },
        bonusGen: () => ["best case", "worst case", "average case", "comparison", "in-place"]
      },
      {
        template: "What is the difference between {structure1} and {structure2}?",
        variables: {
          structure1: ["stack", "array", "linked list", "queue", "deque", "priority queue", "circular queue"],
          structure2: ["queue", "linked list", "array", "stack", "circular buffer", "heap", "linear queue"]
        },
        mustHaveGen: (vars) => {
          const concepts: Record<string, string[]> = {
            "stack-queue": ["lifo", "fifo", "push", "pop"],
            "array-linked list": ["contiguous", "nodes", "index", "pointer"],
            "linked list-array": ["dynamic", "static", "memory", "access"],
            "queue-stack": ["fifo", "lifo", "enqueue", "dequeue"],
            "deque-circular buffer": ["double ended", "circular", "front", "rear"],
            "priority queue-heap": ["priority", "complete tree", "max", "min"],
            "circular queue-linear queue": ["circular", "front rear", "wrap around", "overflow"]
          };
          return concepts[`${vars.structure1}-${vars.structure2}`] || ["structure", "operations", "access", "memory"];
        },
        bonusGen: () => ["implementation", "use case", "complexity", "memory allocation"]
      },
      {
        template: "What is a {dataStructure} and where is it commonly used?",
        variables: {
          dataStructure: ["binary tree", "linked list", "hash map", "heap", "graph", "trie", "stack", "queue", "deque", "set", "multiset", "priority queue", "circular buffer", "skip list"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "binary tree": ["node", "left", "right", "root", "traversal"],
            "linked list": ["node", "pointer", "next", "head", "dynamic"],
            "hash map": ["key", "value", "hash function", "lookup", "o(1)"],
            "heap": ["priority", "complete tree", "parent", "child", "extract"],
            "graph": ["vertex", "edge", "node", "connection", "path"],
            "trie": ["prefix", "tree", "characters", "search", "autocomplete"],
            "stack": ["lifo", "push", "pop", "top", "function calls"],
            "queue": ["fifo", "enqueue", "dequeue", "front", "rear"],
            "deque": ["double ended", "front", "rear", "insert", "delete"],
            "set": ["unique", "no duplicates", "membership", "union", "intersection"],
            "multiset": ["duplicates allowed", "count", "frequency", "sorted"],
            "priority queue": ["priority", "highest first", "heap", "extract max"],
            "circular buffer": ["fixed size", "wrap around", "producer consumer", "ring buffer"],
            "skip list": ["probabilistic", "layers", "fast search", "linked list"]
          };
          return keywords[vars.dataStructure] || ["structure", "data", "operations"];
        },
        bonusGen: () => ["implementation", "real-world", "application", "advantage"]
      },
      {
        template: "Explain the concept of {concept} in data structures.",
        variables: {
          concept: ["recursion", "iteration", "time complexity", "space complexity", "in-place algorithms", "stable sorting", "comparison-based sorting", "linear data structures", "non-linear data structures", "abstract data types"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "recursion": ["base case", "recursive case", "call stack", "function calls itself"],
            "iteration": ["loop", "repetition", "while", "for", "increment"],
            "time complexity": ["big o", "operations", "input size", "growth rate"],
            "space complexity": ["memory", "auxiliary space", "input space", "algorithm memory"],
            "in-place algorithms": ["constant space", "o(1) space", "modify input", "no extra array"],
            "stable sorting": ["relative order", "equal elements", "preserve", "original position"],
            "comparison-based sorting": ["compare elements", "o(n log n)", "lower bound", "decision tree"],
            "linear data structures": ["sequential", "one after another", "array", "list"],
            "non-linear data structures": ["hierarchical", "tree", "graph", "multiple paths"],
            "abstract data types": ["interface", "operations", "implementation independent", "behavior"]
          };
          return keywords[vars.concept] || ["concept", "data structure", "algorithm"];
        },
        bonusGen: () => ["example", "when to use", "advantage", "limitation"]
      },
      {
        template: "How does {operation} work in a {structure}?",
        variables: {
          operation: ["insertion", "deletion", "searching", "traversal", "accessing elements", "updating"],
          structure: ["array", "linked list", "binary search tree", "hash table", "heap", "stack", "queue"]
        },
        mustHaveGen: () => ["operation", "step", "algorithm", "complexity"],
        bonusGen: () => ["time complexity", "edge cases", "implementation", "best case"]
      },
      {
        template: "Explain {traversal} traversal in a binary tree.",
        variables: {
          traversal: ["inorder", "preorder", "postorder", "level order", "zigzag level order", "boundary"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "inorder": ["left root right", "sorted order", "bst", "recursive"],
            "preorder": ["root left right", "copy tree", "prefix", "recursive"],
            "postorder": ["left right root", "delete tree", "postfix", "recursive"],
            "level order": ["bfs", "queue", "level by level", "breadth first"],
            "zigzag level order": ["alternating", "left right", "right left", "deque"],
            "boundary": ["left boundary", "leaves", "right boundary", "anticlockwise"]
          };
          return keywords[vars.traversal] || ["traversal", "visit", "order"];
        },
        bonusGen: () => ["recursive implementation", "iterative implementation", "time complexity", "use case"]
      },
      {
        template: "What is Big O notation and how do we calculate {complexity}?",
        variables: {
          complexity: ["O(1)", "O(n)", "O(n^2)", "O(log n)", "O(n log n)", "O(2^n)"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "O(1)": ["constant", "fixed time", "independent of input", "hash lookup"],
            "O(n)": ["linear", "proportional", "single loop", "array traversal"],
            "O(n^2)": ["quadratic", "nested loops", "bubble sort", "square"],
            "O(log n)": ["logarithmic", "halving", "binary search", "divide"],
            "O(n log n)": ["linearithmic", "merge sort", "efficient sorting", "divide conquer"],
            "O(2^n)": ["exponential", "recursive fibonacci", "subset generation", "power set"]
          };
          return keywords[vars.complexity] || ["complexity", "time", "operations"];
        },
        bonusGen: () => ["example algorithm", "comparison", "best case", "worst case"]
      }
    ],
    medium: [
      {
        template: "Explain how {algorithm} works and analyze its time complexity.",
        variables: {
          algorithm: ["merge sort", "quick sort", "heap sort", "counting sort", "radix sort", "bucket sort", "shell sort", "tim sort", "comb sort", "cocktail sort"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "merge sort": ["divide", "conquer", "merge", "o(n log n)", "stable"],
            "quick sort": ["pivot", "partition", "o(n log n)", "in-place", "divide"],
            "heap sort": ["heap", "extract max", "o(n log n)", "heapify", "complete tree"],
            "counting sort": ["count", "frequency", "o(n+k)", "non-comparison", "stable"],
            "radix sort": ["digit", "bucket", "o(nk)", "non-comparison", "stable"],
            "bucket sort": ["bucket", "distribute", "o(n+k)", "uniform distribution", "range"],
            "shell sort": ["gap", "insertion sort", "diminishing increment", "comparison"],
            "tim sort": ["hybrid", "merge insertion", "runs", "real world data"],
            "comb sort": ["gap", "shrink factor", "bubble sort improvement", "1.3"],
            "cocktail sort": ["bidirectional", "bubble sort variant", "left right", "shaker sort"]
          };
          return keywords[vars.algorithm] || ["sort", "complexity", "efficient"];
        },
        bonusGen: () => ["space complexity", "stable", "in-place", "best case", "worst case"]
      },
      {
        template: "What is {concept} and when would you use it in problem solving?",
        variables: {
          concept: ["dynamic programming", "greedy algorithm", "backtracking", "divide and conquer", "two pointer technique", "sliding window", "binary search on answer", "bit manipulation", "prefix sum", "monotonic stack"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "dynamic programming": ["subproblems", "overlapping", "memoization", "optimal", "tabulation"],
            "greedy algorithm": ["local optimal", "greedy choice", "feasible", "optimization"],
            "backtracking": ["recursive", "explore", "backtrack", "constraints", "solution space"],
            "divide and conquer": ["divide", "conquer", "combine", "subproblems", "recursive"],
            "two pointer technique": ["two pointers", "left", "right", "sorted", "o(n)"],
            "sliding window": ["window", "expand", "shrink", "contiguous", "substring"],
            "binary search on answer": ["search space", "monotonic", "check function", "optimal value"],
            "bit manipulation": ["bits", "xor", "and", "or", "shift"],
            "prefix sum": ["cumulative sum", "range query", "preprocessing", "o(1) query"],
            "monotonic stack": ["increasing", "decreasing", "next greater", "previous smaller"]
          };
          return keywords[vars.concept] || ["algorithm", "approach", "solve"];
        },
        bonusGen: () => ["example problem", "time complexity", "space complexity", "optimization"]
      },
      {
        template: "How would you detect {problem} in a {structure}?",
        variables: {
          problem: ["a cycle", "duplicates", "the middle element", "if it's balanced", "the kth largest element", "if two structures are identical", "a palindrome"],
          structure: ["linked list", "binary tree", "array", "graph", "string", "binary search tree"]
        },
        mustHaveGen: () => ["traverse", "check", "algorithm", "detect"],
        bonusGen: () => ["time complexity", "space complexity", "optimal", "approach"]
      },
      {
        template: "Explain {graphAlgorithm} and its applications.",
        variables: {
          graphAlgorithm: ["BFS (Breadth First Search)", "DFS (Depth First Search)", "topological sorting", "detecting cycles in graph", "finding connected components", "finding bridges", "finding articulation points"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "BFS (Breadth First Search)": ["queue", "level order", "shortest path unweighted", "visited"],
            "DFS (Depth First Search)": ["stack", "recursive", "backtracking", "visited", "explore"],
            "topological sorting": ["dag", "linear ordering", "dependencies", "kahn's algorithm"],
            "detecting cycles in graph": ["visited", "recursion stack", "back edge", "dfs"],
            "finding connected components": ["dfs", "bfs", "union find", "groups"],
            "finding bridges": ["dfs", "discovery time", "low link", "cut edge"],
            "finding articulation points": ["dfs", "discovery time", "low link", "cut vertex"]
          };
          return keywords[vars.graphAlgorithm] || ["graph", "algorithm", "traversal"];
        },
        bonusGen: () => ["time complexity", "space complexity", "implementation", "real-world use"]
      },
      {
        template: "How do you implement {dataStructure} from scratch?",
        variables: {
          dataStructure: ["a hash table", "a binary heap", "a trie", "a segment tree", "a disjoint set (Union-Find)", "an LRU cache", "a min-max heap"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "a hash table": ["array", "hash function", "collision handling", "chaining", "probing"],
            "a binary heap": ["array representation", "heapify", "parent child", "complete tree"],
            "a trie": ["nodes", "children map", "end of word", "insert search"],
            "a segment tree": ["build", "update", "query", "range operations", "tree array"],
            "a disjoint set (Union-Find)": ["parent array", "find", "union", "path compression", "rank"],
            "an LRU cache": ["hash map", "doubly linked list", "get put", "eviction"],
            "a min-max heap": ["alternate levels", "min root", "max level", "double comparisons"]
          };
          return keywords[vars.dataStructure] || ["implementation", "methods", "data structure"];
        },
        bonusGen: () => ["time complexity of operations", "space complexity", "edge cases", "optimizations"]
      },
      {
        template: "Explain how to solve the {problem} problem efficiently.",
        variables: {
          problem: ["two sum", "three sum", "maximum subarray", "longest increasing subsequence", "merge intervals", "meeting rooms", "valid parentheses", "product of array except self", "rotate array", "search in rotated sorted array"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "two sum": ["hash map", "complement", "o(n)", "index pair"],
            "three sum": ["sort", "two pointer", "o(n^2)", "skip duplicates"],
            "maximum subarray": ["kadane", "running sum", "max so far", "o(n)"],
            "longest increasing subsequence": ["dp", "binary search", "patience sort", "o(n log n)"],
            "merge intervals": ["sort", "overlap", "merge", "result array"],
            "meeting rooms": ["sort by start", "overlap check", "greedy"],
            "valid parentheses": ["stack", "matching", "push pop", "empty stack"],
            "product of array except self": ["prefix", "suffix", "no division", "o(n)"],
            "rotate array": ["reverse", "k mod n", "in-place", "three reverses"],
            "search in rotated sorted array": ["binary search", "pivot", "sorted half", "o(log n)"]
          };
          return keywords[vars.problem] || ["algorithm", "approach", "solution"];
        },
        bonusGen: () => ["time complexity", "space complexity", "follow-up", "edge cases"]
      }
    ],
    hard: [
      {
        template: "Explain {algorithm} for {problem} and discuss its complexity.",
        variables: {
          algorithm: ["Dijkstra's algorithm", "Bellman-Ford algorithm", "Floyd-Warshall algorithm", "Kruskal's algorithm", "Prim's algorithm", "A* search algorithm", "Johnson's algorithm", "Tarjan's algorithm"],
          problem: ["shortest path", "minimum spanning tree", "graph traversal", "network flow", "strongly connected components", "all pairs shortest path"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "Dijkstra's algorithm": ["shortest path", "greedy", "priority queue", "non-negative", "relaxation"],
            "Bellman-Ford algorithm": ["shortest path", "negative weights", "relaxation", "v-1 iterations"],
            "Floyd-Warshall algorithm": ["all pairs", "dynamic programming", "matrix", "intermediate"],
            "Kruskal's algorithm": ["minimum spanning tree", "union find", "sorted edges", "greedy"],
            "Prim's algorithm": ["minimum spanning tree", "greedy", "priority queue", "vertex based"],
            "A* search algorithm": ["heuristic", "admissible", "f=g+h", "optimal path"],
            "Johnson's algorithm": ["all pairs", "reweighting", "bellman ford dijkstra", "sparse graphs"],
            "Tarjan's algorithm": ["strongly connected", "dfs", "low link", "scc"]
          };
          return keywords[vars.algorithm] || ["graph", "algorithm", "complexity"];
        },
        bonusGen: () => ["time complexity", "space complexity", "application", "optimization", "proof"]
      },
      {
        template: "How would you solve the {problem} problem using {technique}?",
        variables: {
          problem: ["longest common subsequence", "knapsack", "coin change", "edit distance", "matrix chain multiplication", "longest palindromic substring", "word break", "regular expression matching", "wildcard matching", "palindrome partitioning"],
          technique: ["dynamic programming", "memoization", "tabulation", "space-optimized DP"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "longest common subsequence": ["lcs", "subsequence", "dp table", "match", "max"],
            "knapsack": ["weight", "value", "capacity", "include", "exclude"],
            "coin change": ["coins", "minimum", "amount", "dp", "subproblem"],
            "edit distance": ["insert", "delete", "replace", "minimum operations", "dp table"],
            "matrix chain multiplication": ["parenthesization", "cost", "optimal", "multiplication"],
            "longest palindromic substring": ["expand around center", "dp", "palindrome", "manacher"],
            "word break": ["dictionary", "dp", "prefix", "substring"],
            "regular expression matching": ["dot star", "dp", "pattern", "match"],
            "wildcard matching": ["question star", "dp", "greedy", "pattern"],
            "palindrome partitioning": ["partition", "minimum cuts", "dp", "palindrome check"]
          };
          return keywords[vars.problem] || ["dynamic programming", "optimal", "subproblem"];
        },
        bonusGen: () => ["recurrence relation", "base case", "time complexity", "space optimization"]
      },
      {
        template: "Explain the {algorithm} algorithm and its use in competitive programming.",
        variables: {
          algorithm: ["KMP (Knuth-Morris-Pratt)", "Rabin-Karp", "Z-algorithm", "Manacher's", "Suffix Array", "Fenwick Tree (BIT)", "Heavy-Light Decomposition", "Mo's algorithm", "Square Root Decomposition"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "KMP (Knuth-Morris-Pratt)": ["pattern matching", "failure function", "lps array", "o(n+m)"],
            "Rabin-Karp": ["rolling hash", "pattern matching", "hash collision", "multiple patterns"],
            "Z-algorithm": ["z array", "prefix", "pattern matching", "o(n)"],
            "Manacher's": ["palindrome", "center expansion", "o(n)", "longest palindromic substring"],
            "Suffix Array": ["sorted suffixes", "lcp", "pattern search", "string processing"],
            "Fenwick Tree (BIT)": ["binary indexed tree", "prefix sum", "update", "o(log n)"],
            "Heavy-Light Decomposition": ["tree paths", "chains", "segment tree", "path queries"],
            "Mo's algorithm": ["offline queries", "sqrt decomposition", "range queries", "block sorting"],
            "Square Root Decomposition": ["sqrt blocks", "precompute", "range queries", "point updates"]
          };
          return keywords[vars.algorithm] || ["algorithm", "advanced", "competitive programming"];
        },
        bonusGen: () => ["implementation details", "time complexity", "space complexity", "example problems"]
      },
      {
        template: "How do you solve {problem} optimally?",
        variables: {
          problem: ["the N-Queens problem", "Sudoku solver", "the traveling salesman problem", "graph coloring", "maximum flow", "minimum cut", "bipartite matching", "shortest path with k edges"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "the N-Queens problem": ["backtracking", "constraint", "diagonal", "column check"],
            "Sudoku solver": ["backtracking", "constraint propagation", "valid check", "empty cell"],
            "the traveling salesman problem": ["dp bitmask", "np hard", "approximation", "held karp"],
            "graph coloring": ["backtracking", "chromatic number", "greedy", "constraint"],
            "maximum flow": ["ford fulkerson", "edmonds karp", "augmenting path", "residual graph"],
            "minimum cut": ["max flow min cut", "ford fulkerson", "residual graph", "s-t cut"],
            "bipartite matching": ["hungarian", "hopcroft karp", "maximum matching", "augmenting path"],
            "shortest path with k edges": ["dp", "bellman ford variant", "k iterations", "edge count"]
          };
          return keywords[vars.problem] || ["problem", "optimization", "algorithm"];
        },
        bonusGen: () => ["time complexity", "space complexity", "optimization techniques", "applications"]
      },
      {
        template: "Explain {concept} and how it's used in advanced data structures.",
        variables: {
          concept: ["lazy propagation", "persistent data structures", "implicit treaps", "link-cut trees", "centroid decomposition", "euler tour technique"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "lazy propagation": ["segment tree", "range update", "deferred", "propagate on query"],
            "persistent data structures": ["versioning", "immutable", "path copying", "fat node"],
            "implicit treaps": ["bst heap hybrid", "split merge", "rope", "sequence operations"],
            "link-cut trees": ["dynamic trees", "splay tree", "path operations", "access preferred"],
            "centroid decomposition": ["tree center", "divide conquer", "path queries", "distance queries"],
            "euler tour technique": ["flatten tree", "subtree queries", "segment tree", "in out time"]
          };
          return keywords[vars.concept] || ["advanced", "data structure", "technique"];
        },
        bonusGen: () => ["implementation", "use cases", "complexity analysis", "problems that use it"]
      }
    ]
  },
  os: {
    easy: [
      {
        template: "What is the difference between {concept1} and {concept2}?",
        variables: {
          concept1: ["process", "program", "kernel mode", "multitasking", "physical memory", "stack", "paging", "preemptive scheduling"],
          concept2: ["thread", "process", "user mode", "multiprocessing", "virtual memory", "heap", "segmentation", "non-preemptive scheduling"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "process-thread": ["memory", "resource", "lightweight", "shared", "address space"],
            "program-process": ["static", "dynamic", "execution", "memory", "running"],
            "kernel mode-user mode": ["privileged", "restricted", "hardware", "system call"],
            "multitasking-multiprocessing": ["single cpu", "multiple cpu", "concurrent", "parallel"],
            "physical memory-virtual memory": ["ram", "abstraction", "address space", "swap"],
            "stack-heap": ["automatic", "dynamic", "lifo", "allocation"],
            "paging-segmentation": ["fixed size", "variable size", "page", "segment"],
            "preemptive scheduling-non-preemptive scheduling": ["interrupt", "voluntary", "time slice", "completion"]
          };
          return keywords[`${vars.concept1}-${vars.concept2}`] || ["operating system", "concept", "difference"];
        },
        bonusGen: () => ["example", "use case", "advantage", "context switch"]
      },
      {
        template: "Explain what {concept} means in operating systems.",
        variables: {
          concept: ["context switching", "system call", "interrupt handling", "process states", "PCB (Process Control Block)", "kernel", "bootloader", "shell", "daemon process", "orphan process", "zombie process", "fork system call", "exec system call"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "context switching": ["save", "restore", "registers", "state", "overhead"],
            "system call": ["user mode", "kernel mode", "interface", "services", "trap"],
            "interrupt handling": ["interrupt", "handler", "ISR", "priority", "hardware"],
            "process states": ["new", "ready", "running", "waiting", "terminated"],
            "PCB (Process Control Block)": ["process id", "state", "registers", "memory", "information"],
            "kernel": ["core", "hardware", "system services", "privileged", "os core"],
            "bootloader": ["boot", "load os", "mbr", "grub", "initialization"],
            "shell": ["command interpreter", "interface", "bash", "terminal", "commands"],
            "daemon process": ["background", "service", "no terminal", "system tasks"],
            "orphan process": ["parent terminated", "init adopts", "ppid", "reparenting"],
            "zombie process": ["terminated", "exit status", "wait", "resource leak"],
            "fork system call": ["create process", "child", "copy", "pid"],
            "exec system call": ["replace", "load program", "new image", "execute"]
          };
          return keywords[vars.concept] || ["operating system", "kernel", "process"];
        },
        bonusGen: () => ["example", "implementation", "importance", "overhead"]
      },
      {
        template: "What are the main functions of {component} in an operating system?",
        variables: {
          component: ["the process scheduler", "the memory manager", "the file system", "the I/O manager", "the interrupt handler", "the device driver"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "the process scheduler": ["allocate cpu", "scheduling algorithm", "ready queue", "dispatch"],
            "the memory manager": ["allocate memory", "virtual memory", "protection", "sharing"],
            "the file system": ["storage", "directories", "access control", "organization"],
            "the I/O manager": ["device communication", "buffering", "drivers", "requests"],
            "the interrupt handler": ["handle interrupts", "isr", "priority", "context save"],
            "the device driver": ["hardware interface", "abstraction", "kernel module", "communication"]
          };
          return keywords[vars.component] || ["function", "responsibility", "operating system"];
        },
        bonusGen: () => ["implementation", "challenges", "example", "importance"]
      },
      {
        template: "Describe the {type} type of operating system.",
        variables: {
          type: ["batch processing", "time-sharing", "real-time", "distributed", "embedded", "network", "mobile"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "batch processing": ["jobs", "no user interaction", "queue", "throughput"],
            "time-sharing": ["multiple users", "time slice", "interactive", "response time"],
            "real-time": ["deadline", "deterministic", "hard soft", "predictable"],
            "distributed": ["multiple computers", "network", "resource sharing", "transparency"],
            "embedded": ["dedicated function", "resource constrained", "real-time", "specific purpose"],
            "network": ["file sharing", "client server", "network resources", "centralized"],
            "mobile": ["touch interface", "power efficiency", "sensors", "apps"]
          };
          return keywords[vars.type] || ["operating system", "type", "characteristics"];
        },
        bonusGen: () => ["examples", "advantages", "disadvantages", "use cases"]
      },
      {
        template: "What is {concept} and why is it important?",
        variables: {
          concept: ["process synchronization", "inter-process communication", "CPU scheduling", "memory protection", "file permissions", "user authentication"]
        },
        mustHaveGen: () => ["importance", "mechanism", "operating system", "functionality"],
        bonusGen: () => ["implementation", "examples", "challenges", "solutions"]
      }
    ],
    medium: [
      {
        template: "Explain {algorithm} scheduling algorithm and its characteristics.",
        variables: {
          algorithm: ["Round Robin", "Shortest Job First (SJF)", "Priority Scheduling", "First Come First Serve (FCFS)", "Multilevel Queue", "Multilevel Feedback Queue", "Shortest Remaining Time First (SRTF)", "Highest Response Ratio Next (HRRN)", "Lottery Scheduling", "Fair Share Scheduling"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "Round Robin": ["time quantum", "preemptive", "fair", "circular queue"],
            "Shortest Job First (SJF)": ["burst time", "shortest", "optimal", "starvation"],
            "Priority Scheduling": ["priority", "preemptive", "non-preemptive", "starvation"],
            "First Come First Serve (FCFS)": ["fifo", "non-preemptive", "simple", "convoy effect"],
            "Multilevel Queue": ["multiple queues", "priority", "scheduling", "foreground", "background"],
            "Multilevel Feedback Queue": ["feedback", "dynamic priority", "aging", "multiple queues"],
            "Shortest Remaining Time First (SRTF)": ["preemptive sjf", "remaining time", "optimal", "overhead"],
            "Highest Response Ratio Next (HRRN)": ["response ratio", "waiting time", "burst time", "non-preemptive"],
            "Lottery Scheduling": ["random", "tickets", "probabilistic", "fair"],
            "Fair Share Scheduling": ["user groups", "proportional", "share", "fair allocation"]
          };
          return keywords[vars.algorithm] || ["scheduling", "cpu", "process"];
        },
        bonusGen: () => ["waiting time", "turnaround time", "response time", "throughput", "starvation"]
      },
      {
        template: "How does {mechanism} work in memory management?",
        variables: {
          mechanism: ["paging", "segmentation", "virtual memory", "demand paging", "page replacement", "memory mapping", "copy-on-write", "memory compaction", "swapping", "memory-mapped files"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "paging": ["page", "frame", "page table", "fixed size", "physical memory"],
            "segmentation": ["segment", "variable size", "logical", "segment table"],
            "virtual memory": ["virtual address", "physical address", "swap", "larger than physical"],
            "demand paging": ["page fault", "lazy loading", "swap in", "needed pages"],
            "page replacement": ["page fault", "victim page", "algorithm", "fifo", "lru"],
            "memory mapping": ["map file", "virtual address", "shared", "mmap"],
            "copy-on-write": ["cow", "shared pages", "copy on modify", "fork optimization"],
            "memory compaction": ["fragmentation", "move processes", "contiguous", "overhead"],
            "swapping": ["swap space", "disk", "memory full", "suspend resume"],
            "memory-mapped files": ["file mapping", "virtual memory", "lazy loading", "shared"]
          };
          return keywords[vars.mechanism] || ["memory", "address", "allocation"];
        },
        bonusGen: () => ["fragmentation", "page table", "TLB", "performance", "overhead"]
      },
      {
        template: "Explain {problem} and how to solve it.",
        variables: {
          problem: ["deadlock", "starvation", "priority inversion", "the dining philosophers problem", "the producer-consumer problem", "the readers-writers problem", "race conditions", "critical section problem"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "deadlock": ["mutual exclusion", "hold and wait", "no preemption", "circular wait"],
            "starvation": ["indefinite waiting", "priority", "fairness", "aging"],
            "priority inversion": ["low priority", "high priority", "blocking", "inheritance"],
            "the dining philosophers problem": ["resource allocation", "deadlock", "synchronization", "semaphore"],
            "the producer-consumer problem": ["buffer", "full empty", "synchronization", "semaphore"],
            "the readers-writers problem": ["shared resource", "mutual exclusion", "readers preference", "writers preference"],
            "race conditions": ["concurrent access", "critical section", "timing", "synchronization"],
            "critical section problem": ["mutual exclusion", "progress", "bounded waiting", "solution"]
          };
          return keywords[vars.problem] || ["problem", "solution", "synchronization"];
        },
        bonusGen: () => ["prevention", "avoidance", "detection", "recovery"]
      },
      {
        template: "Explain the concept of {concept} in file systems.",
        variables: {
          concept: ["inodes", "file allocation table (FAT)", "journaling", "hard links vs soft links", "file descriptors", "directory structure", "disk scheduling algorithms"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "inodes": ["metadata", "file information", "pointer", "unix", "number"],
            "file allocation table (FAT)": ["fat table", "cluster", "dos", "linked list"],
            "journaling": ["transaction", "recovery", "crash consistency", "log"],
            "hard links vs soft links": ["inode", "symbolic", "reference", "path"],
            "file descriptors": ["integer", "open file", "process", "table"],
            "directory structure": ["tree", "hierarchy", "path", "entries"],
            "disk scheduling algorithms": ["seek time", "fcfs", "sstf", "scan", "elevator"]
          };
          return keywords[vars.concept] || ["file system", "storage", "organization"];
        },
        bonusGen: () => ["implementation", "example", "advantages", "file systems that use it"]
      }
    ],
    hard: [
      {
        template: "Explain {algorithm} and its role in deadlock handling.",
        variables: {
          algorithm: ["Banker's algorithm", "deadlock detection algorithm", "resource allocation graph", "wait-for graph", "victim selection algorithms"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "Banker's algorithm": ["safe state", "available", "max need", "allocation", "request"],
            "deadlock detection algorithm": ["wait-for graph", "cycle detection", "periodic", "resource type"],
            "resource allocation graph": ["process", "resource", "edge", "request", "assignment"],
            "wait-for graph": ["process", "waiting", "cycle", "deadlock"],
            "victim selection algorithms": ["cost", "priority", "rollback", "termination"]
          };
          return keywords[vars.algorithm] || ["deadlock", "algorithm", "detection"];
        },
        bonusGen: () => ["time complexity", "implementation", "limitations", "examples"]
      },
      {
        template: "Discuss {concept} in modern operating systems.",
        variables: {
          concept: ["NUMA architecture", "CPU affinity", "kernel preemption", "real-time scheduling", "memory-mapped I/O", "DMA (Direct Memory Access)", "virtualization techniques", "containerization"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "NUMA architecture": ["non-uniform memory", "local remote", "node", "performance"],
            "CPU affinity": ["processor binding", "cache", "migration", "performance"],
            "kernel preemption": ["preemptive kernel", "low latency", "responsiveness", "real-time"],
            "real-time scheduling": ["deadline", "rate monotonic", "edf", "priority"],
            "memory-mapped I/O": ["address space", "registers", "port", "device"],
            "DMA (Direct Memory Access)": ["direct transfer", "cpu bypass", "channel", "burst"],
            "virtualization techniques": ["hypervisor", "vm", "type 1 2", "hardware support"],
            "containerization": ["container", "namespaces", "cgroups", "isolation"]
          };
          return keywords[vars.concept] || ["concept", "operating system", "advanced"];
        },
        bonusGen: () => ["implementation", "advantages", "challenges", "examples"]
      },
      {
        template: "How do modern operating systems implement {feature}?",
        variables: {
          feature: ["memory protection", "process isolation", "system call handling", "interrupt vectoring", "kernel synchronization", "loadable kernel modules"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "memory protection": ["page table", "access bits", "segmentation", "mmu"],
            "process isolation": ["address space", "protection rings", "permissions", "security"],
            "system call handling": ["trap", "interrupt", "mode switch", "syscall table"],
            "interrupt vectoring": ["interrupt vector table", "handler", "priority", "dispatch"],
            "kernel synchronization": ["spinlock", "mutex", "rcu", "atomic operations"],
            "loadable kernel modules": ["dynamic loading", "kernel space", "dependencies", "insmod"]
          };
          return keywords[vars.feature] || ["implementation", "operating system", "feature"];
        },
        bonusGen: () => ["linux vs windows", "performance implications", "security considerations", "examples"]
      }
    ]
  },
  dbms: {
    easy: [
      {
        template: "What is the difference between {concept1} and {concept2} in databases?",
        variables: {
          concept1: ["primary key", "DDL", "HAVING", "DELETE", "inner join", "SQL", "clustered index", "OLTP"],
          concept2: ["foreign key", "DML", "WHERE", "TRUNCATE", "outer join", "NoSQL", "non-clustered index", "OLAP"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "primary key-foreign key": ["unique", "reference", "constraint", "relationship", "entity"],
            "DDL-DML": ["create alter drop", "select insert update delete", "schema", "data"],
            "HAVING-WHERE": ["aggregate", "group by", "filter", "condition"],
            "DELETE-TRUNCATE": ["rollback", "transaction", "faster", "where clause"],
            "inner join-outer join": ["matching", "all rows", "null", "left right"],
            "SQL-NoSQL": ["relational", "non-relational", "schema", "flexible"],
            "clustered index-non-clustered index": ["physical order", "logical pointer", "one per table", "multiple"],
            "OLTP-OLAP": ["transaction", "analytics", "normalized", "denormalized"]
          };
          return keywords[`${vars.concept1}-${vars.concept2}`] || ["database", "concept", "difference"];
        },
        bonusGen: () => ["example", "use case", "performance", "when to use"]
      },
      {
        template: "Explain what {concept} means in DBMS.",
        variables: {
          concept: ["a database schema", "normalization", "a transaction", "ACID properties", "referential integrity", "entity-relationship model", "data redundancy", "data independence", "database views"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "a database schema": ["structure", "tables", "columns", "relationships", "design"],
            "normalization": ["redundancy", "1nf 2nf 3nf", "functional dependency", "decomposition"],
            "a transaction": ["unit of work", "commit", "rollback", "atomic"],
            "ACID properties": ["atomicity", "consistency", "isolation", "durability"],
            "referential integrity": ["foreign key", "parent child", "constraint", "consistency"],
            "entity-relationship model": ["entity", "relationship", "attribute", "er diagram"],
            "data redundancy": ["duplicate data", "storage", "inconsistency", "update anomaly"],
            "data independence": ["logical", "physical", "abstraction", "schema changes"],
            "database views": ["virtual table", "query", "security", "simplification"]
          };
          return keywords[vars.concept] || ["database", "concept", "definition"];
        },
        bonusGen: () => ["example", "importance", "advantages", "implementation"]
      },
      {
        template: "What are the main types of {element} in SQL?",
        variables: {
          element: ["joins", "keys", "constraints", "data types", "operators", "aggregate functions", "SQL commands"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "joins": ["inner", "outer", "left", "right", "cross", "self"],
            "keys": ["primary", "foreign", "unique", "candidate", "composite"],
            "constraints": ["not null", "unique", "check", "default", "primary key"],
            "data types": ["int", "varchar", "date", "decimal", "text"],
            "operators": ["arithmetic", "comparison", "logical", "and or not"],
            "aggregate functions": ["count", "sum", "avg", "max", "min"],
            "SQL commands": ["select", "insert", "update", "delete", "create"]
          };
          return keywords[vars.element] || ["sql", "types", "database"];
        },
        bonusGen: () => ["syntax", "examples", "use cases", "performance"]
      },
      {
        template: "Explain {normalForm} normal form in database normalization.",
        variables: {
          normalForm: ["First (1NF)", "Second (2NF)", "Third (3NF)", "Boyce-Codd (BCNF)"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "First (1NF)": ["atomic values", "no repeating groups", "single valued", "unique rows"],
            "Second (2NF)": ["1nf", "partial dependency", "composite key", "full dependency"],
            "Third (3NF)": ["2nf", "transitive dependency", "non-key", "direct dependency"],
            "Boyce-Codd (BCNF)": ["3nf", "every determinant", "candidate key", "stronger"]
          };
          return keywords[vars.normalForm] || ["normalization", "normal form", "dependency"];
        },
        bonusGen: () => ["example", "violations", "decomposition", "when to use"]
      }
    ],
    medium: [
      {
        template: "Explain {concept} in database transactions.",
        variables: {
          concept: ["two-phase locking", "deadlock prevention", "transaction isolation levels", "serializability", "conflict serializability", "view serializability", "timestamp ordering", "optimistic concurrency control"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "two-phase locking": ["growing phase", "shrinking phase", "lock", "release"],
            "deadlock prevention": ["wound-wait", "wait-die", "timestamp", "preemption"],
            "transaction isolation levels": ["read uncommitted", "read committed", "repeatable read", "serializable"],
            "serializability": ["serial schedule", "equivalent", "conflict", "order"],
            "conflict serializability": ["precedence graph", "cycle", "conflict equivalent", "acyclic"],
            "view serializability": ["initial read", "final write", "view equivalent"],
            "timestamp ordering": ["timestamp", "read write timestamp", "older younger", "abort"],
            "optimistic concurrency control": ["validation", "commit time", "no locks", "abort if conflict"]
          };
          return keywords[vars.concept] || ["transaction", "concurrency", "database"];
        },
        bonusGen: () => ["implementation", "trade-offs", "examples", "protocols"]
      },
      {
        template: "How do you optimize {aspect} in database systems?",
        variables: {
          aspect: ["query performance", "indexing strategies", "query execution plans", "database partitioning", "database sharding", "connection pooling", "caching strategies", "query profiling"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "query performance": ["optimizer", "index", "execution plan", "statistics"],
            "indexing strategies": ["b-tree", "hash", "covering index", "composite"],
            "query execution plans": ["explain", "scan", "join", "cost estimation"],
            "database partitioning": ["horizontal", "vertical", "range", "list", "hash"],
            "database sharding": ["distributed", "shard key", "horizontal scaling", "routing"],
            "connection pooling": ["reuse connections", "overhead reduction", "pool size"],
            "caching strategies": ["query cache", "result cache", "invalidation", "hit ratio"],
            "query profiling": ["explain analyze", "execution time", "bottleneck", "optimization"]
          };
          return keywords[vars.aspect] || ["performance", "optimization", "database"];
        },
        bonusGen: () => ["tools", "best practices", "examples", "trade-offs"]
      },
      {
        template: "What are the advantages and disadvantages of {database} databases?",
        variables: {
          database: ["relational (SQL)", "NoSQL document", "NoSQL key-value", "NoSQL graph", "NoSQL column-family", "time-series", "in-memory"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "relational (SQL)": ["structured", "acid", "joins", "schema", "sql"],
            "NoSQL document": ["json", "flexible schema", "mongodb", "nested"],
            "NoSQL key-value": ["simple", "fast lookup", "redis", "cache"],
            "NoSQL graph": ["relationships", "traversal", "neo4j", "nodes edges"],
            "NoSQL column-family": ["wide column", "cassandra", "write optimized", "distributed"],
            "time-series": ["time-stamped", "metrics", "influxdb", "aggregation"],
            "in-memory": ["fast", "ram", "redis", "volatile"]
          };
          return keywords[vars.database] || ["database", "advantages", "disadvantages"];
        },
        bonusGen: () => ["use cases", "examples", "scalability", "consistency"]
      }
    ],
    hard: [
      {
        template: "Explain {topic} and its role in query optimization.",
        variables: {
          topic: ["query execution plans", "B+ tree indexing", "hash indexing", "query cost estimation", "join algorithms", "bitmap indexes", "covering indexes", "index-only scans", "statistics and histograms"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "query execution plans": ["optimizer", "cost", "scan", "join", "operations"],
            "B+ tree indexing": ["balanced", "leaf nodes", "range queries", "ordered", "logarithmic"],
            "hash indexing": ["hash function", "bucket", "equality", "o(1)", "collision"],
            "query cost estimation": ["statistics", "cardinality", "selectivity", "cost model"],
            "join algorithms": ["nested loop", "hash join", "merge join", "cost", "algorithm"],
            "bitmap indexes": ["bitmap", "low cardinality", "boolean operations", "warehouse"],
            "covering indexes": ["include all columns", "index-only", "no table access", "performance"],
            "index-only scans": ["no table lookup", "covering index", "visibility map", "performance"],
            "statistics and histograms": ["distribution", "cardinality estimation", "optimizer", "analyze"]
          };
          return keywords[vars.topic] || ["optimization", "query", "performance"];
        },
        bonusGen: () => ["example", "when to use", "complexity", "trade-off"]
      },
      {
        template: "Explain {technique} in distributed databases.",
        variables: {
          technique: ["CAP theorem", "PACELC theorem", "eventual consistency", "strong consistency", "distributed transactions", "two-phase commit", "three-phase commit", "Paxos consensus", "Raft consensus", "vector clocks"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "CAP theorem": ["consistency", "availability", "partition tolerance", "trade-off"],
            "PACELC theorem": ["cap extension", "latency", "consistency", "else"],
            "eventual consistency": ["eventually", "replicas", "convergence", "availability"],
            "strong consistency": ["immediate", "linearizable", "single copy", "latency"],
            "distributed transactions": ["multiple nodes", "atomicity", "coordination", "commit"],
            "two-phase commit": ["prepare", "commit", "coordinator", "blocking"],
            "three-phase commit": ["pre-commit", "non-blocking", "timeout", "recovery"],
            "Paxos consensus": ["proposer", "acceptor", "majority", "leader election"],
            "Raft consensus": ["leader", "follower", "candidate", "log replication"],
            "vector clocks": ["causality", "timestamps", "concurrent", "ordering"]
          };
          return keywords[vars.technique] || ["distributed", "consistency", "database"];
        },
        bonusGen: () => ["implementation", "trade-offs", "use cases", "examples"]
      },
      {
        template: "Discuss the implementation of {feature} in modern database systems.",
        variables: {
          feature: ["MVCC (Multi-Version Concurrency Control)", "write-ahead logging", "buffer management", "query parallelization", "columnar storage", "compression techniques", "materialized views"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "MVCC (Multi-Version Concurrency Control)": ["versions", "snapshot", "no locks", "garbage collection"],
            "write-ahead logging": ["wal", "durability", "recovery", "sequential writes"],
            "buffer management": ["buffer pool", "page replacement", "dirty pages", "checkpoint"],
            "query parallelization": ["parallel execution", "partitioning", "coordination", "speedup"],
            "columnar storage": ["column-oriented", "compression", "analytics", "sequential read"],
            "compression techniques": ["dictionary", "run-length", "delta", "storage reduction"],
            "materialized views": ["precomputed", "refresh", "query acceleration", "maintenance"]
          };
          return keywords[vars.feature] || ["implementation", "database", "internal"];
        },
        bonusGen: () => ["database examples", "trade-offs", "performance impact", "configuration"]
      }
    ]
  },
  cn: {
    easy: [
      {
        template: "Explain the role of {layer} in the OSI model.",
        variables: {
          layer: ["Physical layer", "Data Link layer", "Network layer", "Transport layer", "Application layer", "Session layer", "Presentation layer"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "Physical layer": ["bits", "transmission", "cables", "signals", "hardware"],
            "Data Link layer": ["frames", "mac address", "error detection", "flow control"],
            "Network layer": ["packets", "routing", "ip address", "logical addressing"],
            "Transport layer": ["segments", "tcp", "udp", "port", "end-to-end"],
            "Application layer": ["http", "ftp", "smtp", "user interface", "protocols"],
            "Session layer": ["session", "synchronization", "dialog control", "checkpointing"],
            "Presentation layer": ["encryption", "compression", "format", "translation"]
          };
          return keywords[vars.layer] || ["layer", "function", "protocol"];
        },
        bonusGen: () => ["protocols", "PDU", "example", "devices"]
      },
      {
        template: "What is the difference between {protocol1} and {protocol2}?",
        variables: {
          protocol1: ["TCP", "IPv4", "HTTP", "FTP", "hub", "switch", "LAN", "circuit switching"],
          protocol2: ["UDP", "IPv6", "HTTPS", "SFTP", "switch", "router", "WAN", "packet switching"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "TCP-UDP": ["connection", "reliable", "unreliable", "handshake", "acknowledgment"],
            "IPv4-IPv6": ["32-bit", "128-bit", "address space", "header", "format"],
            "HTTP-HTTPS": ["secure", "ssl", "tls", "encryption", "port 80", "port 443"],
            "FTP-SFTP": ["secure", "encryption", "file transfer", "ssh", "plain text"],
            "hub-switch": ["broadcast", "unicast", "collision domain", "mac address table"],
            "switch-router": ["layer 2", "layer 3", "mac", "ip", "routing"],
            "LAN-WAN": ["local", "wide", "geographic", "ownership", "speed"],
            "circuit switching-packet switching": ["dedicated path", "shared", "efficient", "delay"]
          };
          return keywords[`${vars.protocol1}-${vars.protocol2}`] || ["protocol", "difference", "network"];
        },
        bonusGen: () => ["port number", "use case", "header", "application"]
      },
      {
        template: "What is {concept} in computer networks?",
        variables: {
          concept: ["an IP address", "a MAC address", "a subnet mask", "a default gateway", "a port number", "bandwidth", "latency", "throughput", "jitter", "packet loss"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "an IP address": ["network id", "host id", "logical", "ipv4 ipv6"],
            "a MAC address": ["physical", "hardware", "nic", "48-bit", "unique"],
            "a subnet mask": ["network portion", "host portion", "divide", "cidr"],
            "a default gateway": ["router", "exit point", "different network", "forward"],
            "a port number": ["process identifier", "tcp udp", "16-bit", "socket"],
            "bandwidth": ["capacity", "bits per second", "maximum", "data rate"],
            "latency": ["delay", "time", "round trip", "propagation"],
            "throughput": ["actual rate", "effective", "performance", "measured"],
            "jitter": ["variation", "delay", "inconsistent", "voip"],
            "packet loss": ["dropped", "congestion", "error", "reliability"]
          };
          return keywords[vars.concept] || ["network", "concept", "definition"];
        },
        bonusGen: () => ["example", "importance", "measurement", "troubleshooting"]
      },
      {
        template: "Explain the purpose of {device} in a network.",
        variables: {
          device: ["a router", "a switch", "a hub", "a modem", "a firewall", "a load balancer", "an access point"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "a router": ["routing", "layer 3", "ip address", "forward packets", "networks"],
            "a switch": ["layer 2", "mac address", "forward frames", "collision domain"],
            "a hub": ["layer 1", "broadcast", "all ports", "collision"],
            "a modem": ["modulation", "demodulation", "isp", "analog digital"],
            "a firewall": ["security", "filter", "rules", "block allow"],
            "a load balancer": ["distribute", "traffic", "servers", "availability"],
            "an access point": ["wireless", "wifi", "ssid", "clients"]
          };
          return keywords[vars.device] || ["device", "network", "function"];
        },
        bonusGen: () => ["features", "examples", "configuration", "placement"]
      },
      {
        template: "Describe the {topology} network topology.",
        variables: {
          topology: ["bus", "star", "ring", "mesh", "tree", "hybrid"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "bus": ["single cable", "terminator", "collision", "simple"],
            "star": ["central hub", "dedicated connection", "easy troubleshooting"],
            "ring": ["circular", "token", "unidirectional", "sequential"],
            "mesh": ["interconnected", "redundancy", "reliable", "expensive"],
            "tree": ["hierarchical", "root", "branches", "scalable"],
            "hybrid": ["combination", "mixed", "flexible", "complex"]
          };
          return keywords[vars.topology] || ["topology", "network", "structure"];
        },
        bonusGen: () => ["advantages", "disadvantages", "use cases", "diagram"]
      }
    ],
    medium: [
      {
        template: "How does {protocol} work and what are its key features?",
        variables: {
          protocol: ["DNS resolution", "ARP (Address Resolution Protocol)", "DHCP", "NAT", "ICMP", "BGP", "OSPF", "RIP", "SNMP", "HTTP/2"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "DNS resolution": ["domain name", "ip address", "resolver", "query", "hierarchy"],
            "ARP (Address Resolution Protocol)": ["ip to mac", "broadcast", "arp table", "cache"],
            "DHCP": ["dynamic", "ip allocation", "lease", "server", "automatic"],
            "NAT": ["network address translation", "private ip", "public ip", "port"],
            "ICMP": ["internet control message", "ping", "error reporting", "traceroute"],
            "BGP": ["border gateway", "autonomous system", "path vector", "policy"],
            "OSPF": ["open shortest path first", "link state", "dijkstra", "area"],
            "RIP": ["routing information protocol", "distance vector", "hop count", "simple"],
            "SNMP": ["simple network management", "monitoring", "mib", "agents"],
            "HTTP/2": ["multiplexing", "binary framing", "header compression", "server push"]
          };
          return keywords[vars.protocol] || ["protocol", "network", "communication"];
        },
        bonusGen: () => ["message format", "example", "security", "implementation"]
      },
      {
        template: "Explain how {mechanism} helps in network reliability.",
        variables: {
          mechanism: ["error detection", "error correction", "flow control", "congestion control", "acknowledgments", "retransmission", "checksums", "CRC"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "error detection": ["detect", "checksum", "crc", "parity", "corrupt"],
            "error correction": ["correct", "hamming code", "fec", "retransmit"],
            "flow control": ["sender receiver", "buffer", "sliding window", "rate"],
            "congestion control": ["network congestion", "slow start", "avoidance", "tcp"],
            "acknowledgments": ["ack", "confirmation", "received", "reliable"],
            "retransmission": ["resend", "lost packet", "timeout", "duplicate"],
            "checksums": ["sum", "verify", "integrity", "header data"],
            "CRC": ["cyclic redundancy check", "polynomial", "frame check", "error detection"]
          };
          return keywords[vars.mechanism] || ["reliability", "network", "mechanism"];
        },
        bonusGen: () => ["implementation", "overhead", "examples", "protocols that use it"]
      },
      {
        template: "How does {mechanism} work in TCP?",
        variables: {
          mechanism: ["the three-way handshake", "the sliding window protocol", "congestion control", "flow control", "reliable data transfer", "connection termination"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "the three-way handshake": ["syn", "syn-ack", "ack", "connection establishment"],
            "the sliding window protocol": ["window size", "sender receiver", "sequence number", "buffer"],
            "congestion control": ["slow start", "congestion avoidance", "fast retransmit", "fast recovery"],
            "flow control": ["receive window", "buffer", "advertised window", "sender rate"],
            "reliable data transfer": ["acknowledgment", "retransmission", "sequence number", "checksum"],
            "connection termination": ["fin", "ack", "four-way handshake", "time wait"]
          };
          return keywords[vars.mechanism] || ["tcp", "mechanism", "reliable"];
        },
        bonusGen: () => ["diagram", "state machine", "timeout", "performance"]
      }
    ],
    hard: [
      {
        template: "Explain {concept} and its importance in network security.",
        variables: {
          concept: ["public key infrastructure (PKI)", "TLS/SSL handshake", "Diffie-Hellman key exchange", "certificate authorities", "digital signatures", "IPSec", "VPN technologies", "network intrusion detection"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "public key infrastructure (PKI)": ["certificate", "public key", "private key", "trust", "hierarchy"],
            "TLS/SSL handshake": ["certificate", "key exchange", "cipher suite", "secure connection"],
            "Diffie-Hellman key exchange": ["shared secret", "public values", "prime", "modular arithmetic"],
            "certificate authorities": ["issuer", "trust", "root ca", "chain", "validation"],
            "digital signatures": ["private key sign", "public key verify", "integrity", "non-repudiation"],
            "IPSec": ["tunnel mode", "transport mode", "ah", "esp", "security association"],
            "VPN technologies": ["tunnel", "encryption", "authentication", "remote access"],
            "network intrusion detection": ["signature based", "anomaly based", "ids", "ips"]
          };
          return keywords[vars.concept] || ["security", "network", "encryption"];
        },
        bonusGen: () => ["implementation", "vulnerabilities", "best practices", "tools"]
      },
      {
        template: "How does {protocol} achieve its goals in large-scale networks?",
        variables: {
          protocol: ["BGP (Border Gateway Protocol)", "MPLS", "SDN (Software Defined Networking)", "OSPF in hierarchical design", "IS-IS", "Segment Routing"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "BGP (Border Gateway Protocol)": ["autonomous system", "path vector", "policy", "internet routing"],
            "MPLS": ["label switching", "lsp", "forwarding", "traffic engineering"],
            "SDN (Software Defined Networking)": ["control plane", "data plane", "controller", "programmable"],
            "OSPF in hierarchical design": ["areas", "backbone", "abr", "scalability"],
            "IS-IS": ["link state", "areas", "level 1 2", "scalable"],
            "Segment Routing": ["segments", "source routing", "simplification", "sid"]
          };
          return keywords[vars.protocol] || ["protocol", "large-scale", "network"];
        },
        bonusGen: () => ["scalability", "convergence", "deployment", "challenges"]
      },
      {
        template: "Discuss {topic} in modern network design.",
        variables: {
          topic: ["network virtualization", "Quality of Service (QoS)", "traffic engineering", "network function virtualization (NFV)", "data center networking", "5G network architecture"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "network virtualization": ["virtual network", "isolation", "overlay", "vxlan"],
            "Quality of Service (QoS)": ["priority", "bandwidth", "latency", "classification"],
            "traffic engineering": ["path selection", "load balancing", "optimization", "mpls te"],
            "network function virtualization (NFV)": ["virtual functions", "vnf", "orchestration", "infrastructure"],
            "data center networking": ["spine leaf", "fat tree", "east west", "scalability"],
            "5G network architecture": ["core", "ran", "network slicing", "edge computing"]
          };
          return keywords[vars.topic] || ["network", "design", "modern"];
        },
        bonusGen: () => ["technologies", "challenges", "benefits", "use cases"]
      }
    ]
  },
  oops: {
    easy: [
      {
        template: "Explain {concept} in Object-Oriented Programming with an example.",
        variables: {
          concept: ["encapsulation", "inheritance", "polymorphism", "abstraction", "classes and objects", "constructors", "access modifiers", "method overloading", "method overriding"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "encapsulation": ["data hiding", "private", "getter setter", "bundling", "protection"],
            "inheritance": ["parent child", "extends", "reuse", "is-a relationship", "derived"],
            "polymorphism": ["many forms", "overriding", "overloading", "runtime", "compile time"],
            "abstraction": ["hide details", "abstract class", "interface", "essential features"],
            "classes and objects": ["blueprint", "instance", "attributes", "methods", "new keyword"],
            "constructors": ["initialize", "same name as class", "new object", "default", "parameterized"],
            "access modifiers": ["public", "private", "protected", "visibility", "encapsulation"],
            "method overloading": ["same name", "different parameters", "compile time", "static"],
            "method overriding": ["same signature", "subclass", "runtime", "dynamic"]
          };
          return keywords[vars.concept] || ["oop", "concept", "programming"];
        },
        bonusGen: () => ["code example", "real-world analogy", "benefits", "when to use"]
      },
      {
        template: "What is the difference between {concept1} and {concept2}?",
        variables: {
          concept1: ["class", "abstract class", "method overloading", "composition", "interface", "shallow copy"],
          concept2: ["object", "interface", "method overriding", "inheritance", "abstract class", "deep copy"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "class-object": ["blueprint", "instance", "template", "actual", "memory"],
            "abstract class-interface": ["partial implementation", "contract", "extends", "implements"],
            "method overloading-method overriding": ["compile time", "runtime", "same class", "subclass"],
            "composition-inheritance": ["has-a", "is-a", "flexible", "coupling"],
            "interface-abstract class": ["multiple inheritance", "single inheritance", "abstract methods", "implementation"],
            "shallow copy-deep copy": ["reference", "new object", "nested", "independent"]
          };
          return keywords[`${vars.concept1}-${vars.concept2}`] || ["oop", "difference", "concept"];
        },
        bonusGen: () => ["example", "when to use", "advantages", "language specific"]
      },
      {
        template: "Explain the {relationship} relationship in OOP.",
        variables: {
          relationship: ["is-a", "has-a", "uses-a", "association", "aggregation", "composition"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "is-a": ["inheritance", "subtype", "extends", "specialization"],
            "has-a": ["composition", "contains", "ownership", "part of"],
            "uses-a": ["dependency", "temporary", "parameter", "method local"],
            "association": ["relationship", "connected", "uses", "knows about"],
            "aggregation": ["whole part", "can exist independently", "weak ownership"],
            "composition": ["strong ownership", "lifecycle", "cannot exist independently"]
          };
          return keywords[vars.relationship] || ["relationship", "oop", "association"];
        },
        bonusGen: () => ["uml representation", "code example", "when to use", "comparison"]
      }
    ],
    medium: [
      {
        template: "Explain the {principle} principle in SOLID and why it's important.",
        variables: {
          principle: ["Single Responsibility", "Open-Closed", "Liskov Substitution", "Interface Segregation", "Dependency Inversion"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "Single Responsibility": ["one reason to change", "single purpose", "cohesion", "separation"],
            "Open-Closed": ["open for extension", "closed for modification", "inheritance", "polymorphism"],
            "Liskov Substitution": ["substitutable", "subtype", "behavior", "contract", "parent child"],
            "Interface Segregation": ["small interfaces", "specific", "client", "not depend on unused"],
            "Dependency Inversion": ["abstractions", "high level", "low level", "depend on interface"]
          };
          return keywords[vars.principle] || ["solid", "principle", "design"];
        },
        bonusGen: () => ["code example", "violation example", "benefit", "refactoring"]
      },
      {
        template: "Describe the {pattern} design pattern and when to use it.",
        variables: {
          pattern: ["Singleton", "Factory", "Abstract Factory", "Builder", "Prototype", "Observer", "Strategy", "Decorator", "Adapter", "Facade", "Proxy", "Command", "Template Method", "Iterator", "State"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "Singleton": ["single instance", "private constructor", "global access", "static"],
            "Factory": ["create objects", "interface", "subclass", "hide creation logic"],
            "Abstract Factory": ["family of objects", "related products", "consistency", "factory of factories"],
            "Builder": ["step by step", "complex object", "director", "separate construction"],
            "Prototype": ["clone", "copy", "prototype interface", "avoid creation cost"],
            "Observer": ["subscribe", "notify", "event", "one-to-many", "listener"],
            "Strategy": ["algorithm", "interchangeable", "encapsulate", "runtime"],
            "Decorator": ["add behavior", "wrapper", "extend", "runtime", "composition"],
            "Adapter": ["convert interface", "incompatible", "wrapper", "legacy"],
            "Facade": ["simple interface", "complex subsystem", "unified", "hide complexity"],
            "Proxy": ["placeholder", "control access", "lazy loading", "protection"],
            "Command": ["encapsulate request", "invoker", "receiver", "undo redo"],
            "Template Method": ["skeleton algorithm", "subclass steps", "abstract methods", "hook"],
            "Iterator": ["traverse", "sequential access", "collection", "next hasNext"],
            "State": ["state machine", "behavior change", "context", "state interface"]
          };
          return keywords[vars.pattern] || ["design pattern", "creational", "behavioral"];
        },
        bonusGen: () => ["code example", "real-world use", "advantage", "uml diagram"]
      },
      {
        template: "Explain {concept} and its benefits in software design.",
        variables: {
          concept: ["loose coupling", "high cohesion", "separation of concerns", "dependency injection", "inversion of control", "programming to an interface", "favor composition over inheritance"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "loose coupling": ["independent", "minimal dependencies", "flexible", "maintainable"],
            "high cohesion": ["related functionality", "single purpose", "focused", "module"],
            "separation of concerns": ["different aspects", "modular", "independent changes"],
            "dependency injection": ["inject dependencies", "constructor", "setter", "framework"],
            "inversion of control": ["framework calls", "hollywood principle", "don't call us"],
            "programming to an interface": ["abstraction", "flexible", "swappable", "contract"],
            "favor composition over inheritance": ["has-a", "flexible", "delegation", "runtime"]
          };
          return keywords[vars.concept] || ["design", "principle", "software"];
        },
        bonusGen: () => ["example", "anti-pattern", "refactoring", "when to apply"]
      }
    ],
    hard: [
      {
        template: "How would you implement {pattern} pattern to solve {problem}?",
        variables: {
          pattern: ["Abstract Factory", "Builder", "Prototype", "Command", "State", "Composite", "Chain of Responsibility", "Mediator", "Memento", "Visitor", "Flyweight", "Bridge"],
          problem: ["object creation complexity", "complex object construction", "reducing coupling", "managing state transitions", "undo/redo functionality", "tree structures", "request handling pipeline"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "Abstract Factory": ["family of objects", "interface", "concrete factory", "related products"],
            "Builder": ["step by step", "complex object", "director", "separate construction"],
            "Prototype": ["clone", "copy", "prototype interface", "shallow deep"],
            "Command": ["encapsulate request", "invoker", "receiver", "undo redo"],
            "State": ["state machine", "behavior change", "context", "state interface"],
            "Composite": ["tree structure", "leaf", "composite", "uniform treatment"],
            "Chain of Responsibility": ["chain", "handler", "next", "pass along"],
            "Mediator": ["centralized", "communication", "decouple", "hub"],
            "Memento": ["snapshot", "state", "restore", "history"],
            "Visitor": ["separate algorithm", "double dispatch", "add operations", "elements"],
            "Flyweight": ["shared objects", "intrinsic extrinsic", "memory", "factory"],
            "Bridge": ["abstraction implementation", "decouple", "vary independently", "hierarchy"]
          };
          return keywords[vars.pattern] || ["design pattern", "implementation", "structure"];
        },
        bonusGen: () => ["code implementation", "participants", "consequences", "related patterns"]
      },
      {
        template: "Explain {concept} and how it affects software architecture.",
        variables: {
          concept: ["the Law of Demeter", "Tell Don't Ask principle", "GRASP patterns", "Clean Architecture", "Hexagonal Architecture", "Domain-Driven Design principles", "CQRS pattern"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "the Law of Demeter": ["talk to friends", "minimal knowledge", "coupling", "chaining"],
            "Tell Don't Ask principle": ["tell objects", "don't ask for data", "behavior", "encapsulation"],
            "GRASP patterns": ["general responsibility", "assignment", "information expert", "controller"],
            "Clean Architecture": ["layers", "dependencies inward", "entities", "use cases"],
            "Hexagonal Architecture": ["ports", "adapters", "domain", "infrastructure"],
            "Domain-Driven Design principles": ["domain model", "ubiquitous language", "bounded context", "aggregates"],
            "CQRS pattern": ["command", "query", "separation", "read write models"]
          };
          return keywords[vars.concept] || ["architecture", "principle", "design"];
        },
        bonusGen: () => ["implementation", "examples", "trade-offs", "when to use"]
      },
      {
        template: "How do you handle {challenge} in object-oriented design?",
        variables: {
          challenge: ["circular dependencies", "god objects", "feature envy", "primitive obsession", "shotgun surgery", "divergent change", "parallel inheritance hierarchies"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "circular dependencies": ["break cycle", "interface", "dependency inversion", "restructure"],
            "god objects": ["split responsibilities", "srp", "extract class", "refactor"],
            "feature envy": ["move method", "belongs elsewhere", "data with behavior"],
            "primitive obsession": ["value objects", "domain types", "encapsulate", "meaning"],
            "shotgun surgery": ["consolidate", "single point", "spread changes", "group"],
            "divergent change": ["split class", "separate concerns", "single responsibility"],
            "parallel inheritance hierarchies": ["composition", "strategy", "reduce coupling"]
          };
          return keywords[vars.challenge] || ["code smell", "refactoring", "solution"];
        },
        bonusGen: () => ["detection", "refactoring steps", "prevention", "examples"]
      }
    ]
  },
  python: {
    easy: [
      {
        template: "Explain {concept} in Python with an example.",
        variables: {
          concept: ["list comprehension", "dictionary comprehension", "lambda functions", "tuple unpacking", "string formatting", "slicing", "enumerate function", "zip function", "map function", "filter function", "range function", "len function"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "list comprehension": ["square brackets", "for loop", "expression", "concise", "list"],
            "dictionary comprehension": ["curly braces", "key value", "for loop", "expression"],
            "lambda functions": ["anonymous", "single expression", "lambda keyword", "inline"],
            "tuple unpacking": ["multiple assignment", "unpack", "tuple", "sequence"],
            "string formatting": ["f-string", "format", "placeholder", "concatenation"],
            "slicing": ["start stop step", "substring", "negative index", "copy"],
            "enumerate function": ["index value", "loop", "counter", "iterable"],
            "zip function": ["combine", "parallel iteration", "tuples", "multiple iterables"],
            "map function": ["apply function", "iterable", "transform", "lazy"],
            "filter function": ["filter elements", "predicate", "iterable", "condition"],
            "range function": ["sequence", "numbers", "start stop step", "iteration"],
            "len function": ["length", "count", "size", "elements"]
          };
          return keywords[vars.concept] || ["python", "syntax", "feature"];
        },
        bonusGen: () => ["code example", "use case", "advantage", "alternative"]
      },
      {
        template: "What is the difference between {type1} and {type2} in Python?",
        variables: {
          type1: ["list", "tuple", "set", "is", "=", "append", "deepcopy", "global", "args"],
          type2: ["tuple", "list", "dictionary", "==", "==", "extend", "copy", "nonlocal", "kwargs"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "list-tuple": ["mutable", "immutable", "brackets", "parentheses", "modify"],
            "tuple-list": ["immutable", "mutable", "hashable", "performance"],
            "set-dictionary": ["unique values", "key-value", "unordered", "curly braces"],
            "is-==": ["identity", "equality", "same object", "same value", "memory"],
            "=-==": ["assignment", "comparison", "variable", "boolean"],
            "append-extend": ["single element", "iterable", "add", "extend list"],
            "deepcopy-copy": ["nested objects", "shallow", "independent", "reference"],
            "global-nonlocal": ["module level", "enclosing function", "scope", "modify"],
            "args-kwargs": ["positional", "keyword", "tuple", "dictionary"]
          };
          return keywords[`${vars.type1}-${vars.type2}`] || ["python", "data type", "difference"];
        },
        bonusGen: () => ["when to use", "performance", "memory", "example"]
      },
      {
        template: "Explain Python's {feature} with examples.",
        variables: {
          feature: ["indentation rules", "dynamic typing", "duck typing", "pass by object reference", "truthy and falsy values", "None keyword", "type hints"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "indentation rules": ["whitespace", "block", "4 spaces", "syntax"],
            "dynamic typing": ["runtime", "no declaration", "type changes", "flexible"],
            "duck typing": ["behavior", "not type", "if it walks", "interface"],
            "pass by object reference": ["object reference", "mutable immutable", "assignment", "modify"],
            "truthy and falsy values": ["bool", "false values", "empty", "zero none"],
            "None keyword": ["null", "no value", "singleton", "is None"],
            "type hints": ["annotation", "typing module", "documentation", "mypy"]
          };
          return keywords[vars.feature] || ["python", "feature", "language"];
        },
        bonusGen: () => ["examples", "gotchas", "best practices", "related features"]
      }
    ],
    medium: [
      {
        template: "Explain how {concept} works in Python.",
        variables: {
          concept: ["decorators", "generators", "context managers", "iterators", "*args and **kwargs", "closures", "property decorators", "class methods vs static methods", "dunder methods", "metaclasses basics"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "decorators": ["@symbol", "wrapper", "function", "modify behavior", "higher order"],
            "generators": ["yield", "lazy evaluation", "iterator", "memory efficient", "next"],
            "context managers": ["with statement", "__enter__", "__exit__", "resource management"],
            "iterators": ["__iter__", "__next__", "iteration protocol", "for loop"],
            "*args and **kwargs": ["variable arguments", "positional", "keyword", "unpacking"],
            "closures": ["enclosed", "free variables", "function factory", "state"],
            "property decorators": ["@property", "getter setter", "encapsulation", "attribute"],
            "class methods vs static methods": ["@classmethod", "@staticmethod", "cls", "self"],
            "dunder methods": ["double underscore", "magic methods", "__init__", "__str__"],
            "metaclasses basics": ["type", "class of class", "customize", "__new__"]
          };
          return keywords[vars.concept] || ["python", "advanced", "feature"];
        },
        bonusGen: () => ["code example", "use case", "implementation", "advantage"]
      },
      {
        template: "How does Python handle {concept} and what are the best practices?",
        variables: {
          concept: ["exception handling", "memory management", "garbage collection", "multithreading", "file handling", "logging", "testing", "virtual environments", "dependency management"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "exception handling": ["try", "except", "finally", "raise", "exception"],
            "memory management": ["reference counting", "garbage collector", "heap", "allocation"],
            "garbage collection": ["reference counting", "cycle detection", "gc module", "automatic"],
            "multithreading": ["threading", "gil", "concurrent", "thread", "lock"],
            "file handling": ["open", "close", "read", "write", "with statement"],
            "logging": ["logger", "handlers", "levels", "formatters", "configuration"],
            "testing": ["unittest", "pytest", "assert", "mock", "fixtures"],
            "virtual environments": ["venv", "isolation", "dependencies", "activate"],
            "dependency management": ["pip", "requirements.txt", "poetry", "version"]
          };
          return keywords[vars.concept] || ["python", "best practice", "handling"];
        },
        bonusGen: () => ["tools", "libraries", "patterns", "common mistakes"]
      },
      {
        template: "Explain {topic} in Python's standard library.",
        variables: {
          topic: ["collections module", "itertools module", "functools module", "os and sys modules", "datetime module", "re module", "json module", "pathlib module"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "collections module": ["namedtuple", "deque", "counter", "defaultdict", "ordereddict"],
            "itertools module": ["chain", "cycle", "combinations", "permutations", "groupby"],
            "functools module": ["lru_cache", "partial", "reduce", "wraps", "cache"],
            "os and sys modules": ["file system", "environment", "path", "arguments", "platform"],
            "datetime module": ["date", "time", "timedelta", "strftime", "strptime"],
            "re module": ["regex", "pattern", "match", "search", "findall"],
            "json module": ["loads", "dumps", "file", "serialization", "deserialization"],
            "pathlib module": ["path", "file", "directory", "object-oriented", "cross-platform"]
          };
          return keywords[vars.topic] || ["python", "module", "standard library"];
        },
        bonusGen: () => ["examples", "common use cases", "alternatives", "best practices"]
      }
    ],
    hard: [
      {
        template: "Explain {topic} and its advanced usage in Python.",
        variables: {
          topic: ["metaclasses", "descriptors", "the GIL (Global Interpreter Lock)", "asyncio and async/await", "memory profiling", "C extensions", "type system and generics", "dataclasses and attrs"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "metaclasses": ["type", "class creation", "__new__", "__init__", "customize"],
            "descriptors": ["__get__", "__set__", "__delete__", "property", "attribute access"],
            "the GIL (Global Interpreter Lock)": ["threading limitation", "cpython", "multiprocessing", "concurrency"],
            "asyncio and async/await": ["event loop", "coroutine", "await", "non-blocking", "concurrent"],
            "memory profiling": ["memory_profiler", "tracemalloc", "optimization", "leak detection"],
            "C extensions": ["ctypes", "cython", "performance", "integration", "native"],
            "type system and generics": ["typing module", "generic", "typevar", "protocol", "mypy"],
            "dataclasses and attrs": ["@dataclass", "auto-generated", "immutable", "comparison"]
          };
          return keywords[vars.topic] || ["python", "advanced", "internal"];
        },
        bonusGen: () => ["implementation", "use cases", "performance implications", "gotchas"]
      },
      {
        template: "How would you optimize {scenario} in Python?",
        variables: {
          scenario: ["CPU-bound tasks", "I/O-bound tasks", "memory usage", "startup time", "large data processing", "concurrent operations"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "CPU-bound tasks": ["multiprocessing", "cython", "numpy", "vectorization", "parallel"],
            "I/O-bound tasks": ["asyncio", "threading", "non-blocking", "concurrent futures"],
            "memory usage": ["generators", "slots", "memory views", "gc", "profiling"],
            "startup time": ["lazy imports", "compiled", "pyc", "bytecode"],
            "large data processing": ["chunks", "streaming", "pandas", "dask", "memory efficient"],
            "concurrent operations": ["asyncio", "threading", "multiprocessing", "pool", "executor"]
          };
          return keywords[vars.scenario] || ["optimization", "performance", "python"];
        },
        bonusGen: () => ["profiling tools", "benchmarks", "trade-offs", "best practices"]
      },
      {
        template: "Explain how to implement {pattern} in Python.",
        variables: {
          pattern: ["dependency injection", "plugin architecture", "observer pattern with weak references", "lazy initialization", "memoization with decorators", "context-local state"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "dependency injection": ["constructor injection", "interface", "decoupling", "testing"],
            "plugin architecture": ["dynamic loading", "importlib", "entry points", "extensible"],
            "observer pattern with weak references": ["weakref", "callback", "memory safe", "notification"],
            "lazy initialization": ["property", "cached", "deferred", "on demand"],
            "memoization with decorators": ["cache", "lru_cache", "decorator", "performance"],
            "context-local state": ["contextvars", "thread local", "async", "isolation"]
          };
          return keywords[vars.pattern] || ["pattern", "implementation", "python"];
        },
        bonusGen: () => ["code example", "libraries", "trade-offs", "testing"]
      }
    ]
  },
  webdev: {
    easy: [
      {
        template: "Explain {concept} in web development.",
        variables: {
          concept: ["the CSS box model", "semantic HTML", "responsive design", "CSS flexbox", "CSS grid", "media queries", "CSS selectors", "CSS specificity", "the DOM", "browser developer tools", "HTML forms", "accessibility basics"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "the CSS box model": ["margin", "border", "padding", "content", "box-sizing"],
            "semantic HTML": ["meaning", "accessibility", "seo", "header", "nav", "article"],
            "responsive design": ["media queries", "breakpoints", "mobile", "viewport", "flexible"],
            "CSS flexbox": ["flex container", "flex items", "justify-content", "align-items", "direction"],
            "CSS grid": ["grid container", "rows", "columns", "template", "gap"],
            "media queries": ["breakpoint", "responsive", "screen size", "min-width", "max-width"],
            "CSS selectors": ["class", "id", "element", "descendant", "pseudo"],
            "CSS specificity": ["inline", "id", "class", "element", "cascade"],
            "the DOM": ["document object model", "tree", "nodes", "manipulation", "javascript"],
            "browser developer tools": ["inspect", "console", "network", "debug", "elements"],
            "HTML forms": ["input", "submit", "action", "method", "validation"],
            "accessibility basics": ["aria", "alt text", "keyboard", "screen reader", "wcag"]
          };
          return keywords[vars.concept] || ["web", "css", "html"];
        },
        bonusGen: () => ["example", "browser support", "best practice", "use case"]
      },
      {
        template: "What is the difference between {concept1} and {concept2} in JavaScript?",
        variables: {
          concept1: ["var", "let", "null", "==", "synchronous", "call", "forEach", "function declaration", "primitive types"],
          concept2: ["let/const", "const", "undefined", "===", "asynchronous", "apply/bind", "map", "function expression", "reference types"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "var-let/const": ["scope", "hoisting", "block scope", "function scope", "redeclaration"],
            "let-const": ["reassign", "constant", "block scope", "declaration"],
            "null-undefined": ["intentional", "uninitialized", "absence", "type"],
            "==-===": ["type coercion", "strict equality", "comparison", "type check"],
            "synchronous-asynchronous": ["blocking", "non-blocking", "callback", "promise", "execution"],
            "call-apply/bind": ["invoke", "context", "arguments", "array", "new function"],
            "forEach-map": ["return value", "side effects", "transform", "new array"],
            "function declaration-function expression": ["hoisting", "named", "anonymous", "assignment"],
            "primitive types-reference types": ["value", "reference", "stack", "heap", "copy"]
          };
          return keywords[`${vars.concept1}-${vars.concept2}`] || ["javascript", "difference", "concept"];
        },
        bonusGen: () => ["example", "when to use", "common mistakes", "best practice"]
      },
      {
        template: "Explain what {element} is used for in HTML.",
        variables: {
          element: ["the <head> tag", "the <meta> tag", "the <link> tag", "the <script> tag", "the <div> tag", "the <span> tag", "the <section> tag", "the <article> tag"]
        },
        mustHaveGen: () => ["html", "element", "purpose", "usage"],
        bonusGen: () => ["attributes", "examples", "best practices", "accessibility"]
      },
      {
        template: "What are {concept} and how are they used?",
        variables: {
          concept: ["CSS variables", "CSS pseudo-classes", "CSS pseudo-elements", "CSS animations", "CSS transitions", "CSS units (px, em, rem, vh, vw)"]
        },
        mustHaveGen: () => ["css", "definition", "syntax", "usage"],
        bonusGen: () => ["examples", "browser support", "best practices", "performance"]
      }
    ],
    medium: [
      {
        template: "Explain how {concept} works in JavaScript.",
        variables: {
          concept: ["the event loop", "closures", "promises", "async/await", "prototypal inheritance", "the 'this' keyword", "hoisting", "event bubbling and capturing", "the spread operator", "destructuring", "modules (ES6)"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "the event loop": ["call stack", "callback queue", "single threaded", "asynchronous", "microtask"],
            "closures": ["inner function", "outer scope", "lexical environment", "preserve state"],
            "promises": ["pending", "fulfilled", "rejected", "then", "catch", "async"],
            "async/await": ["async function", "await", "promise", "syntactic sugar", "try catch"],
            "prototypal inheritance": ["prototype", "__proto__", "prototype chain", "object.create"],
            "the 'this' keyword": ["context", "binding", "call apply bind", "arrow functions"],
            "hoisting": ["declaration", "top of scope", "var", "function", "temporal dead zone"],
            "event bubbling and capturing": ["propagation", "target", "bubbles up", "captures down"],
            "the spread operator": ["...", "expand", "copy", "merge", "arguments"],
            "destructuring": ["extract", "object array", "assignment", "default values"],
            "modules (ES6)": ["import", "export", "default", "named", "tree shaking"]
          };
          return keywords[vars.concept] || ["javascript", "concept", "advanced"];
        },
        bonusGen: () => ["code example", "use case", "common pitfalls", "alternative"]
      },
      {
        template: "What is {concept} and why is it important in modern web development?",
        variables: {
          concept: ["REST API design", "CORS", "JWT authentication", "WebSockets", "Service Workers", "Progressive Web Apps", "Server-Side Rendering", "Static Site Generation", "Single Page Applications", "Web Components"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "REST API design": ["resources", "http methods", "stateless", "endpoints", "json"],
            "CORS": ["cross-origin", "preflight", "headers", "same-origin policy", "access-control"],
            "JWT authentication": ["json web token", "stateless", "claims", "signature", "bearer"],
            "WebSockets": ["bidirectional", "real-time", "persistent connection", "ws protocol"],
            "Service Workers": ["background", "offline", "cache", "push notifications", "pwa"],
            "Progressive Web Apps": ["pwa", "installable", "offline", "app-like", "manifest"],
            "Server-Side Rendering": ["ssr", "initial load", "seo", "hydration", "server"],
            "Static Site Generation": ["ssg", "build time", "html", "fast", "cdn"],
            "Single Page Applications": ["spa", "client-side routing", "dynamic", "javascript"],
            "Web Components": ["custom elements", "shadow dom", "templates", "encapsulation"]
          };
          return keywords[vars.concept] || ["web", "concept", "modern"];
        },
        bonusGen: () => ["implementation", "frameworks", "security", "performance"]
      },
      {
        template: "Explain {concept} in the context of web security.",
        variables: {
          concept: ["XSS (Cross-Site Scripting)", "CSRF (Cross-Site Request Forgery)", "SQL Injection", "content security policy", "HTTPS", "input sanitization", "secure cookies"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "XSS (Cross-Site Scripting)": ["script injection", "sanitize", "escape", "dom manipulation"],
            "CSRF (Cross-Site Request Forgery)": ["token", "same-site", "origin check", "unauthorized actions"],
            "SQL Injection": ["parameterized", "escape", "orm", "malicious query"],
            "content security policy": ["csp header", "allowed sources", "inline", "nonce"],
            "HTTPS": ["tls", "encryption", "certificate", "secure connection"],
            "input sanitization": ["validate", "escape", "whitelist", "user input"],
            "secure cookies": ["httponly", "secure", "samesite", "expiration"]
          };
          return keywords[vars.concept] || ["security", "web", "protection"];
        },
        bonusGen: () => ["prevention techniques", "examples", "tools", "best practices"]
      }
    ],
    hard: [
      {
        template: "Explain {concept} and how it improves web performance.",
        variables: {
          concept: ["code splitting", "tree shaking", "bundle optimization", "critical rendering path", "lazy loading strategies", "image optimization", "caching strategies", "CDN usage", "performance metrics (LCP, FID, CLS)", "Web Workers"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "code splitting": ["dynamic import", "chunks", "on-demand", "reduce initial load"],
            "tree shaking": ["dead code elimination", "unused exports", "bundle size", "es modules"],
            "bundle optimization": ["minification", "compression", "splitting", "analysis"],
            "critical rendering path": ["render blocking", "above the fold", "inline critical css"],
            "lazy loading strategies": ["intersection observer", "on-demand", "images", "components"],
            "image optimization": ["compression", "formats", "responsive images", "srcset"],
            "caching strategies": ["cache-control", "etag", "service worker", "stale-while-revalidate"],
            "CDN usage": ["edge servers", "geographic distribution", "caching", "latency"],
            "performance metrics (LCP, FID, CLS)": ["largest contentful paint", "first input delay", "cumulative layout shift", "core web vitals"],
            "Web Workers": ["background thread", "offload computation", "message passing", "non-blocking"]
          };
          return keywords[vars.concept] || ["performance", "optimization", "web"];
        },
        bonusGen: () => ["tools", "measurement", "best practices", "trade-offs"]
      },
      {
        template: "How would you architect a {type} web application?",
        variables: {
          type: ["large-scale e-commerce", "real-time collaborative", "high-traffic content", "micro-frontend", "progressive web app", "headless CMS powered"]
        },
        mustHaveGen: () => ["architecture", "considerations", "technologies", "patterns"],
        bonusGen: () => ["scalability", "maintainability", "team structure", "deployment"]
      },
      {
        template: "Discuss {pattern} in modern frontend development.",
        variables: {
          pattern: ["component composition patterns", "state management patterns", "rendering patterns (CSR, SSR, SSG, ISR)", "micro-frontends", "module federation", "atomic design", "BEM methodology"]
        },
        mustHaveGen: (vars) => {
          const keywords: Record<string, string[]> = {
            "component composition patterns": ["compound components", "render props", "hoc", "hooks"],
            "state management patterns": ["flux", "atomic state", "context", "server state"],
            "rendering patterns (CSR, SSR, SSG, ISR)": ["client", "server", "static", "incremental"],
            "micro-frontends": ["independent teams", "separate deployments", "isolation", "integration"],
            "module federation": ["webpack 5", "shared modules", "runtime loading", "distributed"],
            "atomic design": ["atoms", "molecules", "organisms", "templates", "pages"],
            "BEM methodology": ["block", "element", "modifier", "naming convention", "css"]
          };
          return keywords[vars.pattern] || ["pattern", "frontend", "architecture"];
        },
        bonusGen: () => ["implementation", "pros cons", "when to use", "examples"]
      },
      {
        template: "How do you handle {challenge} in frontend development?",
        variables: {
          challenge: ["memory leaks", "race conditions", "infinite loops in rendering", "complex form state", "optimistic updates", "offline-first architecture", "cross-browser compatibility"]
        },
        mustHaveGen: () => ["challenge", "solution", "techniques", "prevention"],
        bonusGen: () => ["debugging tools", "common causes", "best practices", "examples"]
      }
    ]
  }
};

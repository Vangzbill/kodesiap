import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'brute-force',
    title: 'Brute Force',
    icon: 'Hammer',
    description: 'Pendekatan langsung dengan mencoba semua kemungkinan solusi.',
    concept: `Brute Force adalah pendekatan pemecahan masalah yang paling sederhana dan langsung. Algoritma ini bekerja dengan mencacah semua kemungkinan kandidat solusi dan memeriksa apakah setiap kandidat memenuhi pernyataan masalah.
    
Meskipun seringkali bukan metode yang paling efisien karena kompleksitas waktunya yang tinggi (seringkali eksponensial atau faktorial), Brute Force sangat berguna untuk masalah dengan ukuran input kecil atau sebagai pembanding (baseline) untuk algoritma yang lebih optimal.
    
**Kapan menggunakan:**
- Ukuran input kecil (N <= 20).
- Membutuhkan solusi pasti dan waktu implementasi cepat.
- Tidak ada struktur data khusus yang bisa dimanfaatkan.`,
    templateCode: `# Template umum Brute Force (Iteratif)
def solve_brute_force(arr, target):
    n = len(arr)
    # Coba semua pasangan/kombinasi
    for i in range(n):
        for j in range(i + 1, n):
            # Cek kondisi
            if arr[i] + arr[j] == target:
                return [i, j]
    return None`,
    problems: [
      {
        id: 'bf-1',
        title: 'Two Sum',
        difficulty: 'Easy',
        description: 'Diberikan array integer `nums` dan integer `target`, kembalikan indeks dari dua angka sedemikian rupa sehingga jika dijumlahkan menjadi `target`.',
        inputFormat: 'Baris pertama array integer pisahkan spasi. Baris kedua integer target.',
        outputFormat: 'Dua indeks integer dipisahkan spasi.',
        sampleInput: '2 7 11 15\n9',
        sampleOutput: '0 1',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9, jadi return 0 1.',
        solutionCode: `def two_sum(nums, target):
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return f"{i} {j}"
    return "Not Found"`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        testCases: [
          { input: '2 7 11 15\n9', output: '0 1' },
          { input: '3 2 4\n6', output: '1 2' }
        ]
      },
      {
        id: 'bf-2',
        title: 'Maximum Subarray Sum (Basic)',
        difficulty: 'Medium',
        description: 'Temukan subarray (kontigu) dengan jumlah terbesar dalam sebuah array integer.',
        inputFormat: 'Satu baris array integer dipisahkan spasi.',
        outputFormat: 'Satu integer jumlah maksimum.',
        sampleInput: '-2 1 -3 4 -1 2 1 -5 4',
        sampleOutput: '6',
        explanation: 'Subarray [4,-1,2,1] memiliki jumlah terbesar 6.',
        solutionCode: `def max_subarray(nums):
    n = len(nums)
    max_sum = float('-inf')
    for i in range(n):
        current_sum = 0
        for j in range(i, n):
            current_sum += nums[j]
            max_sum = max(max_sum, current_sum)
    return max_sum`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        testCases: [
          { input: '-2 1 -3 4 -1 2 1 -5 4', output: '6' },
          { input: '1', output: '1' }
        ]
      }
    ]
  },
  {
    id: 'heavy-implementation',
    title: 'Heavy Implementation',
    icon: 'Cpu',
    description: 'Soal simulasi yang membutuhkan penulisan kode yang presisi dan panjang.',
    concept: `Masalah tipe 'Heavy Implementation' atau simulasi biasanya tidak memerlukan algoritma yang rumit seperti DP atau Graph, tetapi menuntut kemampuan menerjemahkan aturan masalah yang kompleks ke dalam kode tanpa bug.
    
Kuncinya adalah memecah masalah menjadi fungsi-fungsi kecil, menangani edge cases (kasus batas) dengan hati-hati, dan menjaga kode tetap bersih agar mudah di-debug. Struktur data seperti Map/Dictionary atau Set sering digunakan untuk membantu manajemen state.`,
    templateCode: `# Tips: Pecah menjadi fungsi kecil
def process_step(state):
    # Logika update state
    pass

def is_valid(x, y, rows, cols):
    return 0 <= x < rows and 0 <= y < cols

def solve_simulation(instructions):
    state = initialize_state()
    for cmd in instructions:
        state = process_step(state)
    return state`,
    problems: [
      {
        id: 'hi-1',
        title: 'Robot Movement',
        difficulty: 'Medium',
        description: 'Simulasikan pergerakan robot pada grid N x M. Robot mulai di (0,0) menghadap Timur. Instruksi berupa string: "L" (belok kiri), "R" (belok kanan), "F" (maju 1 langkah). Jika robot menabrak dinding, abaikan perintah maju.',
        inputFormat: 'Baris 1: N M (ukuran grid). Baris 2: String instruksi.',
        outputFormat: 'Posisi akhir X Y dan arah (N/E/S/W).',
        sampleInput: '5 5\nRFF',
        sampleOutput: '2 0 S',
        explanation: 'Mulai (0,0) E. R -> hadap S. F -> (1,0). F -> (2,0).',
        solutionCode: `def solve_robot(rows, cols, instructions):
    # Arah: N, E, S, W
    dx = [-1, 0, 1, 0]
    dy = [0, 1, 0, -1]
    dirs = ['N', 'E', 'S', 'W']
    
    x, y = 0, 0
    d_idx = 1 # Start East
    
    for char in instructions:
        if char == 'L':
            d_idx = (d_idx - 1) % 4
        elif char == 'R':
            d_idx = (d_idx + 1) % 4
        elif char == 'F':
            nx, ny = x + dx[d_idx], y + dy[d_idx]
            if 0 <= nx < rows and 0 <= ny < cols:
                x, y = nx, ny
                
    return f"{x} {y} {dirs[d_idx]}"`,
        timeComplexity: 'O(K) dimana K panjang instruksi',
        spaceComplexity: 'O(1)',
        testCases: [
          { input: '5 5\nRFF', output: '2 0 S' }
        ]
      },
      {
        id: 'hi-2',
        title: 'Matrix Rotation',
        difficulty: 'Medium',
        description: 'Putar matriks N x N sebesar 90 derajat searah jarum jam secara in-place.',
        inputFormat: 'Baris 1: N. Baris berikutnya N baris elemen matriks.',
        outputFormat: 'Matriks setelah diputar.',
        sampleInput: '3\n1 2 3\n4 5 6\n7 8 9',
        sampleOutput: '7 4 1\n8 5 2\n9 6 3',
        solutionCode: `def rotate_matrix(matrix):
    n = len(matrix)
    # Transpose
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    
    # Reverse rows
    for i in range(n):
        matrix[i].reverse()
    return matrix`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        testCases: [
            {input: '2\n1 2\n3 4', output: '3 1\n4 2'}
        ]
      }
    ]
  },
  {
    id: 'sorting',
    title: 'Sorting & Data Struct',
    icon: 'ListOrdered',
    description: 'Mengurutkan data dan penggunaan struktur data dasar.',
    concept: `Sorting adalah proses menyusun elemen dalam urutan tertentu (ascending/descending). Algoritma efisien seperti Merge Sort atau Quick Sort berjalan dalam O(N log N).
    
Seringkali masalah sorting dikombinasikan dengan Struktur Data seperti Stack, Queue, atau Hash Map. Python memiliki built-in sort yang sangat cepat (Timsort).`,
    templateCode: `# Python sorting
arr.sort() # In-place, O(N log N)
sorted_arr = sorted(arr) # Return new list

# Custom sort key
# Misal sort berdasarkan panjang string, lalu alfabetis
arr.sort(key=lambda x: (len(x), x))`,
    problems: [
      {
        id: 'sort-1',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        description: 'Diberikan dua string s dan t, kembalikan true jika t adalah anagram dari s, dan false jika sebaliknya.',
        inputFormat: 'Dua string s dan t dipisahkan spasi',
        outputFormat: 'True atau False',
        sampleInput: 'anagram nagaram',
        sampleOutput: 'True',
        solutionCode: `def is_anagram(s, t):
    return sorted(s) == sorted(t)`,
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        testCases: [{input: 'rat car', output: 'False'}]
      },
      {
        id: 'sort-2',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        description: 'Diberikan kumpulan interval, gabungkan semua interval yang tumpang tindih.',
        inputFormat: 'Baris 1: N jumlah interval. Baris berikutnya: start end.',
        outputFormat: 'Daftar interval gabungan.',
        sampleInput: '4\n1 3\n2 6\n8 10\n15 18',
        sampleOutput: '1 6\n8 10\n15 18',
        solutionCode: `def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged`,
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        testCases: [{input: '2\n1 4\n4 5', output: '1 5'}]
      }
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    icon: 'Search',
    description: 'Pencarian efisien pada data terurut dengan membagi ruang pencarian.',
    concept: `Binary Search mencari elemen dalam array terurut dengan membagi interval pencarian menjadi dua bagian berulang kali. Jika nilai kunci pencarian kurang dari item di tengah interval, persempit interval ke bagian bawah. Jika tidak, persempit ke bagian atas.
    
Binary Search juga bisa digunakan untuk mencari jawaban ("Binary Search on Answer") jika fungsi jawaban bersifat monotonik.`,
    templateCode: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    problems: [
      {
        id: 'bs-1',
        title: 'Cari Posisi Insert',
        difficulty: 'Easy',
        description: 'Diberikan array terurut dan target nilai. Kembalikan indeks jika target ditemukan. Jika tidak, kembalikan indeks di mana target akan disisipkan secara terurut.',
        inputFormat: 'Baris 1: Array. Baris 2: Target.',
        outputFormat: 'Integer indeks.',
        sampleInput: '1 3 5 6\n5',
        sampleOutput: '2',
        solutionCode: `def search_insert(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return left`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        testCases: [{input: '1 3 5 6\n2', output: '1'}]
      },
      {
        id: 'bs-2',
        title: 'Rotated Sorted Array',
        difficulty: 'Medium',
        description: 'Array integer yang diurutkan menaik diputar di suatu pivot yang tidak diketahui. Cari target di dalamnya.',
        inputFormat: 'Baris 1: Array Rotated. Baris 2: Target.',
        outputFormat: 'Indeks target atau -1.',
        sampleInput: '4 5 6 7 0 1 2\n0',
        sampleOutput: '4',
        solutionCode: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        
        # Cek sisi kiri terurut
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]:
                r = mid - 1
            else:
                l = mid + 1
        # Sisi kanan terurut
        else:
            if nums[mid] < target <= nums[r]:
                l = mid + 1
            else:
                r = mid - 1
    return -1`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        testCases: [{input: '4 5 6 7 0 1 2\n3', output: '-1'}]
      }
    ]
  },
  {
    id: 'dfs',
    title: 'DFS (Depth-First)',
    icon: 'Share2',
    description: 'Penelusuran graf/tree sedalam mungkin sebelum kembali (backtrack).',
    concept: `Depth-First Search (DFS) adalah algoritma untuk menelusuri struktur data tree atau graph. Algoritma dimulai pada node akar dan mengeksplorasi sejauh mungkin di sepanjang setiap cabang sebelum melakukan backtracking.
    
DFS sering diimplementasikan menggunakan rekursi atau Stack. Sangat berguna untuk: mencari path, cycle detection, topological sort, dan menghitung komponen terhubung.`,
    templateCode: `def dfs(node, visited, graph):
    if node in visited:
        return
    visited.add(node)
    # Process node
    for neighbor in graph[node]:
        dfs(neighbor, visited, graph)`,
    problems: [
      {
        id: 'dfs-1',
        title: 'Number of Islands',
        difficulty: 'Medium',
        description: 'Diberikan grid peta \'1\' (tanah) dan \'0\' (air), hitung jumlah pulau. Pulau dikelilingi oleh air.',
        inputFormat: 'N baris string biner.',
        outputFormat: 'Jumlah pulau (integer).',
        sampleInput: '11000\n11000\n00100\n00011',
        sampleOutput: '3',
        solutionCode: `def num_islands(grid):
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r] = grid[r][:c] + '0' + grid[r][c+1:] # Mark as visited
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1
    return count`,
        timeComplexity: 'O(M x N)',
        spaceComplexity: 'O(M x N)',
        testCases: [{input: '111\n010\n111', output: '1'}]
      },
       {
        id: 'dfs-2',
        title: 'Path Sum',
        difficulty: 'Easy',
        description: 'Diberikan root binary tree dan targetSum, tentukan apakah ada path dari root ke leaf yang jumlahnya = targetSum.',
        inputFormat: 'Representasi Tree (Array Level Order), TargetSum.',
        outputFormat: 'True/False',
        sampleInput: '[5,4,8,11,null,13,4,7,2,null,null,null,1], 22',
        sampleOutput: 'True',
        solutionCode: `def has_path_sum(root, target):
    if not root: return False
    target -= root.val
    if not root.left and not root.right:
        return target == 0
    return has_path_sum(root.left, target) or has_path_sum(root.right, target)`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        testCases: []
      }
    ]
  },
  {
    id: 'bfs',
    title: 'BFS (Breadth-First)',
    icon: 'Network',
    description: 'Penelusuran graf level demi level. Optimal untuk shortest path pada graf tanpa bobot.',
    concept: `Breadth-First Search (BFS) menelusuri graf secara melebar. Dimulai dari simpul awal, BFS mengunjungi semua tetangga pada kedalaman saat ini sebelum beralih ke simpul pada tingkat kedalaman berikutnya.
    
BFS menggunakan struktur data Queue (Antrian). Ini adalah algoritma terbaik untuk menemukan jalur terpendek (shortest path) pada graf tak berbobot.`,
    templateCode: `from collections import deque
def bfs(start, graph):
    queue = deque([start])
    visited = set([start])
    while queue:
        node = queue.popleft()
        # Process node
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
    problems: [
      {
        id: 'bfs-1',
        title: 'Shortest Path in Binary Matrix',
        difficulty: 'Medium',
        description: 'Temukan jalur terpendek di grid biner N x N dari kiri atas ke kanan bawah. Sel bernilai 0 bisa dilewati, 1 terblokir. Gerakan 8 arah.',
        inputFormat: 'N baris grid 0/1.',
        outputFormat: 'Panjang jalur terpendek atau -1.',
        sampleInput: '0 0 0\n1 1 0\n1 1 0',
        sampleOutput: '4',
        solutionCode: `from collections import deque
def shortest_path(grid):
    N = len(grid)
    if grid[0][0] or grid[N-1][N-1]: return -1
    q = deque([(0, 0, 1)])
    grid[0][0] = 1
    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    while q:
        r, c, dist = q.popleft()
        if r == N-1 and c == N-1: return dist
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < N and 0 <= nc < N and grid[nr][nc] == 0:
                q.append((nr, nc, dist + 1))
                grid[nr][nc] = 1
    return -1`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(N²)',
        testCases: [{input: '0 1\n1 0', output: '2'}]
      },
      {
        id: 'bfs-2',
        title: 'Level Order Traversal',
        difficulty: 'Medium',
        description: 'Kembalikan traversal level order dari node binary tree sebagai list of lists.',
        inputFormat: 'Tree Root',
        outputFormat: '[[Level1], [Level2], ...]',
        sampleInput: '[3,9,20,null,null,15,7]',
        sampleOutput: '[[3],[9,20],[15,7]]',
        solutionCode: `def level_order(root):
    if not root: return []
    res = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        testCases: []
      }
    ]
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    icon: 'Layers',
    description: 'Memecahkan masalah kompleks dengan memecahnya menjadi sub-masalah yang tumpang tindih.',
    concept: `Dynamic Programming (DP) adalah metode optimasi yang menyimpan hasil dari sub-masalah agar tidak dihitung ulang (memoization atau tabulation).
    
Syarat utama DP:
1. Overlapping Subproblems: Sub-masalah dipanggil berulang kali.
2. Optimal Substructure: Solusi optimal masalah besar bisa dibentuk dari solusi optimal sub-masalah.`,
    templateCode: `# Top-Down (Memoization)
memo = {}
def dp(n):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = dp(n-1) + dp(n-2)
    return memo[n]

# Bottom-Up (Tabulation)
def dp_iter(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
    problems: [
      {
        id: 'dp-1',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        description: 'Anda memanjat tangga. Butuh n langkah untuk sampai ke puncak. Setiap kali bisa naik 1 atau 2 langkah. Ada berapa cara unik?',
        inputFormat: 'Integer n.',
        outputFormat: 'Integer jumlah cara.',
        sampleInput: '3',
        sampleOutput: '3',
        explanation: '1+1+1, 1+2, 2+1.',
        solutionCode: `def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        testCases: [{input: '2', output: '2'}]
      },
      {
        id: 'dp-2',
        title: 'Coin Change',
        difficulty: 'Medium',
        description: 'Diberikan array koin denominasi berbeda dan total amount. Hitung jumlah koin paling sedikit untuk mencapai amount. Jika tidak bisa, return -1.',
        inputFormat: 'Baris 1: Coins. Baris 2: Amount.',
        outputFormat: 'Integer jumlah koin.',
        sampleInput: '1 2 5\n11',
        sampleOutput: '3',
        explanation: '11 = 5 + 5 + 1 (3 koin).',
        solutionCode: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != float('inf') else -1`,
        timeComplexity: 'O(S * N)',
        spaceComplexity: 'O(S)',
        testCases: [{input: '2\n3', output: '-1'}]
      }
    ]
  },
  {
    id: 'dijkstra',
    title: 'Dijkstra',
    icon: 'MapPin',
    description: 'Algoritma pencarian jalur terpendek pada graf berbobot non-negatif.',
    concept: `Algoritma Dijkstra menemukan jalur terpendek dari simpul sumber ke semua simpul lain dalam graf berbobot (bobot >= 0).
    
Algoritma ini menggunakan Priority Queue (Min-Heap) untuk selalu memilih simpul terdekat yang belum dikunjungi ("Greedy approach") dan melakukan relaksasi pada tetangganya.`,
    templateCode: `import heapq
def dijkstra(graph, start, n):
    # graph: list of (neighbor, weight)
    dists = {i: float('inf') for i in range(n)}
    dists[start] = 0
    pq = [(0, start)]
    
    while pq:
        curr_dist, u = heapq.heappop(pq)
        if curr_dist > dists[u]: continue
        
        for v, weight in graph[u]:
            if curr_dist + weight < dists[v]:
                dists[v] = curr_dist + weight
                heapq.heappush(pq, (dists[v], v))
    return dists`,
    problems: [
      {
        id: 'dj-1',
        title: 'Network Delay Time',
        difficulty: 'Medium',
        description: 'Diberikan network node 1..N, dan times[i] = (u, v, w) waktu sinyal dari u ke v adalah w. Berapa lama sampai semua node menerima sinyal dari node K?',
        inputFormat: 'List times, N, K.',
        outputFormat: 'Waktu integer atau -1.',
        sampleInput: '[[2,1,1],[2,3,1],[3,4,1]], 4, 2',
        sampleOutput: '2',
        solutionCode: `import heapq
from collections import defaultdict

def network_delay_time(times, n, k):
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
        
    pq = [(0, k)]
    dist = {}
    
    while pq:
        d, node = heapq.heappop(pq)
        if node in dist: continue
        dist[node] = d
        for neighbor, weight in graph[node]:
            if neighbor not in dist:
                heapq.heappush(pq, (d + weight, neighbor))
                
    return max(dist.values()) if len(dist) == n else -1`,
        timeComplexity: 'O(E log V)',
        spaceComplexity: 'O(V + E)',
        testCases: []
      },
      {
        id: 'dj-2',
        title: 'Cheapest Flights',
        difficulty: 'Medium',
        description: 'Cari harga termurah dari src ke dst dengan maksimal K stop.',
        inputFormat: 'Flights, src, dst, k',
        outputFormat: 'Harga termurah',
        sampleInput: '...',
        sampleOutput: '...',
        solutionCode: `# Note: Ini sebenarnya modifikasi Dijkstra/BFS
# Code omitted for brevity`,
        timeComplexity: 'O(E log V)',
        spaceComplexity: 'O(V)',
        testCases: []
      }
    ]
  }
];
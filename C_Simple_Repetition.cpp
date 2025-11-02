#include <bits/stdc++.h>

using namespace std;

#define ar array
#define ll long long
#define ld long double
#define sza(x) ((int)x.size())
#define all(a) (a).begin(), (a).end()

const int MAX_N = 1e5 + 5;
const ll MOD = 1e9 + 7;
const ll INF = 1e9;
const ld EPS = 1e-9;

template<typename Node, typename Update>
struct SegTree {
    vector<Node> tree;
    vector<ll> arr; // type may change
    int n;
    int s;
    SegTree(int a_len, vector<ll> &a) { // change if type updated
        arr = a;
        n = a_len;
        s = 1;
        while (s < 2 * n) {
            s = s << 1;
        }
        tree.resize(s); fill(all(tree), Node());
        build(0, n - 1, 1);
    }
    void build(int start, int end, int index) { // Never change this
        if (start == end) {
            tree[index] = Node(arr[start]);
            return;
        }
        int mid = (start + end) / 2;
        build(start, mid, 2 * index);
        build(mid + 1, end, 2 * index + 1);
        tree[index].merge(tree[2 * index], tree[2 * index + 1]);
    }
    void update(int start, int end, int index, int query_index, Update &u) { // Never Change this
        if (start == end) {
            u.apply(tree[index]);
            return;
        }
        int mid = (start + end) / 2;
        if (mid >= query_index)
            update(start, mid, 2 * index, query_index, u);
        else
            update(mid + 1, end, 2 * index + 1, query_index, u);
        tree[index].merge(tree[2 * index], tree[2 * index + 1]);
    }
    Node query(int start, int end, int index, int left, int right) { // Never change this
        if (start > right || end < left)
            return Node();
        if (start >= left && end <= right)
            return tree[index];
        int mid = (start + end) / 2;
        Node l, r, ans;
        l = query(start, mid, 2 * index, left, right);
        r = query(mid + 1, end, 2 * index + 1, left, right);
        ans.merge(l, r);
        return ans;
    }
    void make_update(int index, ll val) { // pass in as many parameters as required
        Update new_update = Update(val); // may change
        update(0, n - 1, 1, index, new_update);
    }
    Node make_query(int left, int right) {
        return query(0, n - 1, 1, left, right);
    }
};
struct Node1 {
    ll val; // may change
    Node1() { // Identity element
        val = 0; // may change
    }
    Node1(ll p1) { // Actual Node
        val = p1; // may change
    }
    void merge(Node1 &l, Node1 &r) { // Merge two child nodes
        val = l.val ^ r.val; // may change
    }
};
struct Update1 {
    ll val; // may change
    Update1(ll p1) { // Actual Update
        val = p1; // may change
    }
    void apply(Node1 &a) { // apply update to given node
        a.val = val; // may change
    }
};

//void dfs(ll vertex, ll parent=0ll){
    //for(auto child : g[vertex]){
        //if(child==parent) continue;
        //depth[child]=depth[vertex]+1;
        //dfs(child,vertex);
        //height[vertex]=max(height[vertex],height[child]+1);
    //}
//}

ll fastExponentiation(ll base, ll exp, ll mod) {
    ll result = 1;
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp /= 2;
    }
    return result;
}



void sieve(){
    vector<bool> is_prime(1000001, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i <= 1000000; ++i) {
        if (is_prime[i]) {
            for (int j = i * i; j <= 1000000; j += i) {
                is_prime[j] = false;
            }
        }
    }
}

bool isprime(ll x){
    if(x<=1) return false;
    for(ll i=2;i*i<=x;i++){
        if(x%i==0) return false;
    }
    return true;
}

void solve() {
    
    //ll n; cin>>n;	
    ll x, k;cin>>x>>k;
    if(k>1 && x!=1){
        cout<<"NO"<<endl;
        return;
    }
    if(x==1){
        ll i=0;
        while(k>0){
            i = i*10;
            i += 1;
            k--;
        }
        if(isprime(i)) cout<<"YES"<<endl;
        else cout<<"NO"<<endl;
        return;
    }
    if(isprime(x)) cout<<"YES"<<endl;
    else cout<<"NO"<<endl;

     
}

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    cin >> tc;
    while(tc--) {
        solve();
    }
}
package utils;

//class thr extends Thread{
//	public void run(){
//		StringUtil.hasU51();
//	}
//}

/*
 public static void main(String[] args)throws IOException{
 BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
 String str;
 while((str=bf.readLine()) != null){

 }
 bf.close();
 }

 public static void main(String[] args){
 Scanner in = new Scanner(System.in);
 while(in.hasNext()){

 }
 in.close();
 }
 */
/*
 kicndbvtazczllcipodvlrliqargjayiivkuymrusywvotxycdzscogyejpvfmrldueulwijytocrf
 msatgfqpleswalkvowbcjllbmtxdjqtxlxoyrobrnpuctrcowegmyjjmgkzibmbplpslbsfawrqmzeckiwctwizhpkthvqaukxmzhyqbhhjbihzoidheibsrfbzaruhlwoiwlexwoaicikadrhcvevcnwxwsskooedipgftdfcmdpdonvjtzsncuylrbfzstplfsnebivzdyhhbajfokqvscrzobdzgnfkeqfhzpugbekegaiidhervdsgc

 */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class StringUtil {
	
	public static void main(String[] args){
		
		String A = "1AB2345CD";
		String B = "12345EF";
		int n = 9;
		int m = 7;
		int dp[][] = new int[n][m];
		
		int max = 0;
		for(int i=0; i<n; i++){
			for(int j=0; j<m; j++){
				if(A.charAt(i) == B.charAt(j)){
					if(i == 0 || j == 0){
						dp[i][j] = 1;
					}
					else{
						dp[i][j] = dp[i-1][j-1]+1;
					}
					max = Math.max(max,dp[i][j]);
				}
			}
		}
		System.out.println(max);
	}
	
//	public static void main(String[] args){
//		int n = 6;
//		int A[] = new int[]{1,3,5,2,4,6};
//		int sum = 0;
//		for(int i=1; i<n; i++){
//			for(int j=0; j<i; j++){
//				if(A[i]>=A[j])
//					sum += A[j];
//			}
//		}
//		System.out.println(sum);
//	}

//	public static void main(String[] args) throws IOException {
//		BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
//		String str;
//		while ((str = bf.readLine()) != null) {
//			int nidx = str.lastIndexOf(",")+1;
//			String nstr = str.substring(nidx);
//			int n = Integer.valueOf(nstr);
//			String astr = str.substring(1,nidx-2);
//			String arrs[] = astr.split(",");
//			int alen = arrs.length;
//			int a[] = new int[alen];
//			for(int i=0; i<alen; i++){
//				a[i] = Integer.valueOf(arrs[i]);
//			}
//			
//			int max = 0;
//			if(n>alen)
//				n = alen;
//			for(int i=1; i<n; i++){
//				for(int j=0; j<i; j++){
//					if(a[i]-a[j] > max)
//						max = a[i]-a[j];
//				}
//			}
//			System.out.println(max);
//		}
//		bf.close();
//	}

	// public static void main(String[] args) {
	// Scanner in = new Scanner(System.in);
	// while (in.hasNext()) {
	// int n = in.nextInt();
	// int cnt = 0;
	// float sum = 0;
	// int cnt2 = 0;
	// for(int i=0; i<n; i++){
	// int num = in.nextInt();
	// if(num < 0){
	// cnt++;
	// }
	// else if(num > 0){
	// sum += num;
	// cnt2++;
	// }
	// }
	// System.out.print(cnt+" ");
	// System.out.printf("%.1f",(float)(sum/cnt2));
	// }
	// in.close();
	// }

	// public static void main(String[] args) throws IOException {
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while ((str = bf.readLine()) != null) {
	// String str2 = bf.readLine();
	// int len1 = str.length();
	// int len2 = str2.length();
	// int dp[][] = new int[len1+1][len2+1];
	// for(int i=1; i<=len1; i++)
	// dp[i][0] = i;
	// for(int j=1; j<=len2; j++)
	// dp[0][j] = j;
	// dp[0][0] = 0;
	// for(int i=1; i<=len1; i++){
	// for(int j=1; j<=len2; j++){
	// if(str.charAt(i-1) == str2.charAt(j-1))
	// dp[i][j] = dp[i-1][j-1];
	// else
	// dp[i][j] = dp[i-1][j-1]+1;
	// dp[i][j] = Math.min(dp[i][j], dp[i][j-1]+1);
	// dp[i][j] = Math.min(dp[i][j], dp[i-1][j]+1);
	// }
	// }
	// System.out.println(dp[len1][len2]);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException {
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while ((str = bf.readLine()) != null) {
	// char carr[] = str.toCharArray();
	// Arrays.sort(carr);
	// System.out.println(carr);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException {
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while ((str = bf.readLine()) != null) {
	// String str2 = bf.readLine();
	// System.out.println(encstr(str));
	// System.out.println(decstr(str2));
	// }
	// bf.close();
	// }
	//
	// // 字符串解密
	// public static String decstr(String str) {
	//
	// String res = "";
	// for (int i = 0; i < str.length(); i++) {
	// char c = str.charAt(i);
	// if (c > 'a' && c <= 'z') {
	// c -= 33;
	// } else if (c == 'a') {
	// c = 'Z';
	// } else if (c > 'A' && c <= 'Z') {
	// c += 31;
	// } else if (c == 'A') {
	// c = 'z';
	// } else if (c > '0' && c <= '9') {
	// c -= 1;
	// } else if (c == '0') {
	// c = '9';
	// }
	// res += c;
	// }
	// return res;
	// }
	//
	// // 字符串加密
	// public static String encstr(String str) {
	//
	// String res = "";
	// for (int i = 0; i < str.length(); i++) {
	// char c = str.charAt(i);
	// if (c >= 'a' && c < 'z') {
	// c -= 31;
	// } else if (c == 'z') {
	// c = 'A';
	// } else if (c >= 'A' && c < 'Z') {
	// c += 33;
	// } else if (c == 'Z') {
	// c = 'a';
	// } else if (c >= '0' && c < '9') {
	// c += 1;
	// } else if (c == '9') {
	// c = '0';
	// }
	// res += c;
	// }
	// return res;
	// }

	// public static void main(String[] args) throws IOException {
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String ips;
	// while ((ips = bf.readLine()) != null) {
	// String ints = bf.readLine();
	// System.out.println(iptoint(ips));
	// System.out.println(inttoip(ints));
	// }
	// bf.close();
	// }
	//
	// //int类型数转换成ip
	// public static String inttoip(String ints) {
	//
	// long ipi = Long.valueOf(ints);
	// StringBuffer sb = new StringBuffer();
	// while(ipi != 0){
	// sb.append(ipi%2);
	// ipi >>>= 1;
	// }
	// while(sb.length()%8 != 0){
	// sb.append("0");
	// }
	// sb.reverse();
	// String res = "";
	// int temp = 0;
	// for(int i=sb.length()-1; i>=0; i--){
	// temp += (sb.charAt(i)-'0')<<((sb.length()-i-1)%8);
	// if((sb.length()-i)%8 == 0){
	// res += temp + " ";
	// temp = 0;
	// continue;
	// }
	// }
	// String resa[] = res.split(" ");
	// res = "";
	// for(int i=resa.length-1; i>0; i--)
	// res += resa[i] + ".";
	// res += resa[0];
	// return res;
	// }
	//
	// // IP转换成int类型数
	// public static long iptoint(String ips) {
	// long res = 0;
	// String iparr[] = ips.split("\\.");
	// for (int i = iparr.length - 1; i >= 0; i--) {
	// long tem = Integer.valueOf(iparr[i]);
	// long curpow = (3 - i) * 8;
	// long cnt = 0;
	// while (tem != 0) {
	// res += (tem % 2) << (curpow + cnt++);
	// tem >>>= 1;
	// }
	// }
	// return res;
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// int n = Integer.valueOf(str);
	// for(int i=0; i<n; i++){
	// String s = bf.readLine();
	// String res = "";
	// int len = s.length();
	// if((len+1)%8 != 0){
	// s += "00000000";
	// }
	// for(int j=0; j<s.length(); j++){
	// char c = s.charAt(j);
	// res += c;
	// if((j+1)%8 == 0){
	// System.out.println(res);
	// res = "";
	// }
	// }
	// }
	// }
	// bf.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// String arr[] = str.split("[^a-zA-Z]+");
	// for(int i=arr.length-1; i>=2; i--){
	// System.out.print(arr[i] + " ");
	// }
	// if(arr[0] == ""){
	// System.out.println(arr[1]);
	// }
	// else{
	// System.out.println(arr[1]+" "+arr[0]);
	// }
	// }
	// bf.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// int k = in.nextInt();
	// int num[] = new int[n];
	// for(int i=0; i<n; i++){
	// num[i] = in.nextInt();
	// }
	// Arrays.sort(num);
	// for(int i=0; i<k-1; i++){
	// System.out.print(num[i]+" ");
	// }
	// System.out.println(num[k-1]);
	// }
	// in.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// int max = 0;
	// String res = "";
	// int temp = 0;
	// int cnt = 0;
	// String tstr = "";
	// for(int i=0; i<str.length(); i++){
	// char c = str.charAt(i);
	// if(c >= '0' && c <= '9'){
	// if(temp == 0){
	// temp = 1;
	// }
	// tstr += c+"";
	// cnt++;
	// continue;
	// }
	// else{
	// if(cnt >= max){
	// if(cnt > max){
	// max = cnt;
	// res = tstr;
	// }
	// else{
	// res += " " + tstr;
	// }
	// }
	// temp = 0;
	// cnt = 0;
	// tstr = "";
	// }
	// }
	// if(temp == 1){
	// if(cnt >= max){
	// if(cnt > max){
	// max = cnt;
	// res = tstr;
	// }
	// else{
	// res += " " + tstr;
	// }
	// }
	// }
	// System.out.println(res + "," + max);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) {
	//
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int m = in.nextInt();
	// Map<Integer,Integer> map = new TreeMap<Integer,Integer>();
	// for(int i=0; i<m; i++){
	// map.put(in.nextInt(),0);
	// }
	// int n = in.nextInt();
	// for(int i=0; i<n; i++){
	// map.put(in.nextInt(),0);
	// }
	// String res = "";
	// for(Integer it: map.keySet()){
	// res += it+" ";
	// }
	// System.out.println(res.trim());
	// }
	// in.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// Map<Character, Integer> map = new HashMap<Character, Integer>();
	// for(int i=0; i<str.length(); i++){
	// char c = str.charAt(i);
	// if(map.containsKey(c))
	// map.put(c, map.get(c)+1);
	// else
	// map.put(c, 1);
	// }
	// Map<Integer,Character> res = new TreeMap<Integer,Character>();
	// for(Character c: map.keySet()){
	// res.put(map.get(c)*128+128-c, c);
	// }
	// StringBuffer sb = new StringBuffer();
	// for(Integer i: res.keySet()){
	// sb.append(res.get(i));
	// }
	// System.out.println(sb.reverse().toString());
	// }
	// bf.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// float h = Integer.valueOf(str);
	// float sum = 0; //第一次落地高度为h
	// for(int i=1; i<=5; i++){
	// sum += h + (h/=2);
	// }
	// sum -= h; //第五次落地记录后还需要记录第五次弹起的距离
	// System.out.println(sum+"\n"+h);
	// }
	// bf.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// String str2 = bf.readLine();
	// int i;
	// for(i=0; i<str.length(); i++){
	// if(str2.indexOf(str.charAt(i)) == -1){
	// System.out.println("false");
	// i--;
	// break;
	// }
	// }
	// if(i == str.length())
	// System.out.println("true");
	// }
	// bf.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// Map<Character, Integer> map = new HashMap<Character, Integer>();
	// for(int i=0; i<str.length(); i++){
	// char c = str.charAt(i);
	// if(map.containsKey(c))
	// map.put(c, map.get(c)+1);
	// else
	// map.put(c,1);
	// }
	// Set<Character> set = map.keySet();
	// int temp = 0;
	// int min = 100000;
	// for(Character c: set){
	// if(map.get(c) == 1){
	// temp = 1;
	// int idx = str.indexOf(c);
	// if(min > idx)
	// min = idx;
	// }
	// }
	// if(temp == 0)
	// System.out.println("-1");
	// else
	// System.out.println(str.charAt(min));
	// }
	// bf.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// int n = Integer.valueOf(str);
	// String nums[] = bf.readLine().split(" ");
	// int left[] = new int[n+1];
	// int l = 0;
	// int lcnt = 0;
	// int right[] = new int[n+1];
	// int r = 0;
	// int rcnt = 0;
	// int other[] = new int[n+1];
	// int o = 0;
	// for(int i=0; i<n; i++){
	// int num = Integer.valueOf(nums[i]);
	// if(num%5 == 0){
	// left[l++] = num;
	// lcnt += num;
	// }
	// else if(num%3 == 0){
	// right[r++] = num;
	// rcnt += num;
	// }
	// else{
	// other[o++] = num;
	// }
	// }
	// int sum = Math.abs(lcnt-rcnt);
	// System.out.println(canget(0,o,other,0,sum));
	// }
	// bf.close();
	// }
	//
	// private static boolean canget(int i, int o, int[] other, int j, int sum)
	// {
	//
	// if(i == o)
	// return Math.abs(j) == sum;
	// return (canget(i+1,o,other,j+other[i],sum) ||
	// canget(i+1,o,other,j-other[i],sum));
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// String str2 = bf.readLine();
	// if(str.length() > str2.length()){
	// String s = str;
	// str = str2;
	// str2 = s;
	// }
	// int len = str.length();
	// int max = 0;
	// String res = "";
	// for(int i=1; i<=len; i++){
	// for(int j=0; j<=len-i; j++){
	// String temp = str.substring(j, j+i);
	// int tlen = temp.length();
	// if(str2.contains(temp)){
	// if(tlen > max){
	// max = tlen;
	// res = temp;
	// }
	// }
	// }
	// }
	// System.out.println(res);
	// }
	// bf.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// double n = Double.parseDouble(str);
	// double max = n;
	// double min = 0;
	// double mid = 0;
	// while(max-min > 0.001){
	// mid = (min+max)/2;
	// if(mid*mid*mid >=n)
	// max = mid;
	// else
	// min = mid;
	// }
	// System.out.printf("%.1f\n",max);
	// }
	// bf.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// StringBuffer sb = new StringBuffer();
	// //从A-Z、a-z直接记录字母先
	// for(int i=0; i<26; i++){
	// char c = (char)(i+'A');
	// for(int j=0; j<str.length(); j++){
	// char sc = str.charAt(j);
	// if(c == sc || c == sc -32)
	// sb.append(sc);
	// }
	// }
	// //然后记录非字母字符
	// for(int i=0; i<str.length(); i++){
	// char c = str.charAt(i);
	// if(!(c >= 'a' && c <='z') && !(c >= 'A' && c <= 'Z'))
	// sb.insert(i,c);
	// }
	// System.out.println(sb.toString());
	// }
	// bf.close();
	// }

	// public static void main(String[] args)throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// int temp = 0;
	// for(int i=0; i<str.length(); i++){
	// char c = str.charAt(i);
	// if(c >= '0' && c <= '9'){
	// if(temp == 0){
	// System.out.print("*");
	// temp = 1;
	// }
	// }
	// else{
	// if(temp == 1){
	// System.out.print("*");
	// temp = 0;
	// }
	// }
	// System.out.print(c);
	// }
	// char c = str.charAt(str.length()-1);
	// if(c >= '0' && c <= '9')
	// System.out.print("*");
	// System.out.println();
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	//
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str[];
	// while((str=bf.readLine().split("-")) != null){
	// //大王直接输出
	// if(str[0].contains("joker JOKER") || str[1].contains("joker JOKER"))
	// System.out.println("joker JOKER");
	// else{
	// String left[] = str[0].split(" ");
	// String right[] = str[1].split(" ");
	// int len1 = left.length;
	// int len2 = right.length;
	// //炸弹赢
	// if(len1 == 4 && len2 != 4)
	// System.out.println(str[0]);
	// else if(len2 == 4 && len1 != 4)
	// System.out.println(str[1]);
	// //可以比较的情况下第一个数最大的赢（牌已排好）
	// else if(len1 == len2){
	// String temp = "345678910JQKA2jokerJOKER";
	// if(temp.indexOf(left[0]) > temp.indexOf(right[0]))
	// System.out.println(str[0]);
	// else
	// System.out.println(str[1]);
	// }
	// else
	// System.out.println("ERROR");
	// }
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// String str2 = bf.readLine();
	// int len1 = str.length();
	// int len2 = str2.length();
	// int dp[][] = new int[len1+1][len2+1];
	// for(int j=1; j<=len2; j++)
	// dp[0][j] = j;
	// for(int i=1; i<=len1; i++)
	// dp[i][0] = i;
	// dp[0][0] = 0;
	//
	// for(int i=1; i<=len1; i++){
	// for(int j=1; j<=len2; j++){
	// if(str.charAt(i-1) == str2.charAt(j-1))
	// dp[i][j] = dp[i-1][j-1];
	// else
	// dp[i][j] = dp[i-1][j-1]+1;
	// dp[i][j] = Math.min(dp[i][j],dp[i][j-1]+1);
	// dp[i][j] = Math.min(dp[i][j], dp[i-1][j]+1);
	// }
	// }
	//
	// System.out.println("1/"+(1+dp[len1][len2]));
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// int n = Integer.valueOf(str);
	// String ms[] = bf.readLine().split(" ");
	// String xs[] = bf.readLine().split(" ");
	// int m[] = new int[n+1];
	// int x[] = new int[n+1];
	// int M=0;
	// for(int i=1; i<=n; i++){
	// m[i] = Integer.valueOf(ms[i-1]);
	// x[i] =Integer.valueOf(xs[i-1]);
	// M += m[i]*x[i];
	// }
	// int f[] = new int[M+1];
	// f[0] = 1;
	// f[M] = 1;
	// for(int i=1; i<=n; i++){
	// for(int j=1; j<=x[i]; j++){
	// for(int k=M; k>=m[i]; k--){
	// if(f[k-m[i]] == 1)
	// f[k] = f[k-m[i]];
	// }
	// }
	// }
	// int sum = 0;
	// for(int i=0; i<=M; i++)
	// if(f[i] != 0)
	// sum++;
	// System.out.println(sum);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// int lcase = 0;
	// int num = 0;
	// int oth = 0;
	// int spa = 0;
	// for(int i=0; i<str.length(); i++){
	// char c = str.charAt(i);
	// if((c >='a' && c <='z') || (c >='A' && c <='Z'))
	// lcase++;
	// else if(c >='0' &&c<='9')
	// num++;
	// else if(c == ' ')
	// spa++;
	// else
	// oth++;
	// }
	// System.out.println(lcase+"\n"+spa+"\n"+num+"\n"+oth);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String reg;
	// while((reg=bf.readLine()) != null){
	// String str = bf.readLine();
	// reg = reg.replace("?","[0-9a-zA-Z]{1}");
	// reg = reg.replace("*","[0-9a-zA-Z]*");
	// System.out.println(str.matches(reg));
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String v[];
	// while((v=bf.readLine().split(" ")) != null){
	// String w[] = bf.readLine().split(" ");
	// int allv[] = new int[10001];
	// int allw[] = new int[10001];
	// int maxw = 0;
	// for(int i=0; i<v.length; i++){
	// int cv = Integer.valueOf(v[i]);
	// int cw = Integer.valueOf(w[i]);
	// allv[cv]++;
	// allw[cv] += cw;
	// if(maxw < allw[cv])
	// maxw = allw[cv];
	// }
	// System.out.println(maxw);
	// String res = "";
	// for(int i=0; i<v.length; i++){
	// if(allw[i] == maxw)
	// res = res + i + " ";
	// }
	// String resa[] = res.split(" ");
	// if(resa.length == 1)
	// System.out.println(resa[0]);
	// else{
	// int max = Integer.valueOf(resa[0]);
	// for(int i=1; i<resa.length; i++){
	// int curv = Integer.valueOf(resa[i]);
	// if(allv[max] < allv[curv])
	// max = curv;
	// }
	// System.out.println(max);
	// }
	// }
	// bf.close();
	// }

	// public static Queue<String> que = new PriorityQueue<String>();
	// public static int sum = 0;
	// public static void main(String[] args) throws IOException{
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// for(int i=0; i<5; i++)
	// que.add(in.next());
	// thr t1 = new thr();
	// thr t2 = new thr();
	// thr t3 = new thr();
	// while(que.size() != 0){
	// t1.run();
	// t2.run();
	// t3.run();
	// }
	// System.out.println(sum);
	// }
	// in.close();
	// }
	//
	// public synchronized static void hasU51(){
	// if(que.size() == 0)
	// return ;
	// String str = que.poll();
	// if(str.contains("u51")){
	// sum++;
	// }
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str = bf.readLine()) != null){
	// int n = Integer.valueOf(str);
	// int sum = 0;
	// for(int i=0; i<=n; i++){
	// long m = i*i;
	// int mlen = (m+"").length();
	// int ilen = (i+"").length();
	// String temp = String.valueOf(m).substring(mlen-ilen);
	// if(temp.equals(i+"")){
	// sum++;
	// }
	// }
	// System.out.println(sum);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// BigInteger a = new BigInteger(str.trim());
	// BigInteger b = new BigInteger(bf.readLine());
	// System.out.println(a.add(b).toString());
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String arr[];
	// while((arr=bf.readLine().split(" ")) != null){
	// String str = arr[0];
	// int len = Integer.valueOf(arr[1]);
	// StringBuffer sb = new StringBuffer();
	// for(int i=0,cur=0; i<str.length() && cur<len; i++){
	// char c = str.charAt(i);
	// if(c > 255){
	// if(cur+2 > len)
	// break;
	// cur += 2;
	// sb.append(c);
	// }
	// if(c >= 0 && c <= 255){
	// cur++;
	// sb.append(c);
	// }
	// }
	// System.out.println(sb.toString());
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws NumberFormatException,
	// IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String s1,s2;
	// while((s1 = bf.readLine()) != null){
	// s2 = bf.readLine();
	// int len;
	// String sub;
	// String fro;
	// int flag;
	// if(s1.length() > s2.length()){
	// len = s2.length();
	// sub = s1.substring(s1.length()-len);
	// fro = s1.substring(0,s1.length()-len);
	// flag = 1;
	// }
	// else{
	// len = s1.length();
	// sub = s2.substring(s2.length()-len);
	// fro = s2.substring(0,s2.length()-len);
	// flag = 2;
	// }
	// StringBuffer res = new StringBuffer();
	// int carry = 0;
	// for(int i=len-1; i>=0; i--){
	// int temp;
	// if(flag == 1){
	// temp = Integer.valueOf(s2.charAt(i)+"") +
	// Integer.valueOf(sub.charAt(i)+"") + carry;
	// }
	// else{
	// temp = Integer.valueOf(s1.charAt(i)+"") +
	// Integer.valueOf(sub.charAt(i)+"") + carry;
	// }
	// carry = temp/10;
	// res.append(temp%10);
	// }
	// for(int i=fro.length()-1; i>=0; i--){
	// int temp = Integer.valueOf(fro.charAt(i)+"") + carry;
	// carry = temp/10;
	// res.append(temp%10);
	// }
	// if(carry != 0){
	// res.append(carry);
	// }
	// System.out.println(res.reverse().toString());
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine())!=null){
	// int n = Integer.valueOf(str);
	// int min = n;
	// int a = 0;
	// int b = 0;
	// for(int i=2; i<=n/2; i++){
	// if(!sushu(i) || !sushu(n-i))
	// continue;
	// int temp = Math.abs((n-i-i));
	// if(temp < min){
	// min = temp;
	// a = i;
	// b = n-i;
	// }
	// }
	// System.out.println(a+"\n"+b);
	// }
	// bf.close();
	// }
	// public static boolean sushu(int n){
	// for(int i=2; i*i<=n; i++){
	// if(n%i == 0)
	// return false;
	// }
	// return true;
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// String s1 = in.next();
	// String s2 = in.next();
	// int len1 = s1.length();
	// int len2 = s2.length();
	// int dp[][] = new int[len1+1][len2+1];
	// for(int i=1; i<=len1; i++){
	// for(int j=1; j<=len2; j++){
	// if(s1.charAt(i-1) == s2.charAt(j-1))
	// dp[i][j] = dp[i-1][j-1]+1;
	// else
	// dp[i][j] = 0;
	// }
	// }
	// int max = 0;
	// for(int i=1; i<=len1; i++){
	// for(int j=1; j<=len2; j++)
	// if(max < dp[i][j])
	// max = dp[i][j];
	// }
	// System.out.println(max);
	// }
	// in.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// //计算二进制数
	// StringBuffer sb = new StringBuffer();
	// while(n != 0){
	// sb.append(n%2);
	// n /= 2;
	// }
	// sb.reverse();
	// String s = sb.toString();
	// int max = 0;
	// for(int i=0; i<s.length(); i++){
	// if(s.charAt(i) == '0')
	// continue;
	// int temp = 1;
	// for(int j=i-1; j>=0; j--){
	// if(s.charAt(j) == '0')
	// break;
	// temp++;
	// }
	// if(temp > max)
	// max = temp;
	// }
	// System.out.println(max);
	// }
	// in.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// int num[] = new int[n+1];
	// for(int i=1; i<=n; i++){
	// num[i] = in.nextInt();
	// }
	// //从左到右记录最长递增子序列长度值
	// int ltr[] = new int[n+1];
	// ltr[1] = 1;
	// for(int i=2; i<=n; i++){
	// ltr[i] = 1;
	// for(int j=1; j<i; j++){
	// if(num[i] > num[j] && ltr[j]+1 > ltr[i]){
	// ltr[i] = ltr[j]+1;
	// }
	// }
	// }
	//
	// //从右到左记录最长递增子序列长度值
	// int rtl[] = new int[n+1];
	// rtl[n] = 1;
	// for(int i=n-1; i>=1; i--){
	// rtl[i] = 1;
	// for(int j=n; j>i; j--){
	// if(num[i] >num[j] && rtl[i] < rtl[j]+1)
	// rtl[i] = rtl[j]+1;
	// }
	// }
	//
	// //注意，temp为剩余的个数，最终值要n-temp
	// int temp = 0;
	// for(int i=1; i<=n; i++){
	// if(ltr[i]+rtl[i]-1 > temp)
	// temp = ltr[i]+rtl[i]-1;
	// }
	//
	// System.out.println(n-temp);
	// }
	// in.close();
	// }

	// public static void main(String[] args) throws IOException{
	//
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str = bf.readLine()) != null){
	// int n = Integer.valueOf(str);
	// String numstr[] = bf.readLine().split(" ");
	// int num[] = new int[n+1];
	// for(int i=1; i<=n; i++){
	// num[i] = Integer.valueOf(numstr[i-1]);
	// }
	//
	// int min = 1000000;
	// int tarr[] = new int[n+1];
	// int temp = 0;
	// int ti = 0;
	// for(int i=1; i<n; i++){
	// temp = 0;
	// ti = num[i];
	// for(int j=i+1; j<=n; j++){
	// if(ti > num[j])
	// tarr[temp++] = num[j];
	// else
	// ti = num[j];
	// }
	// if(ti > tarr[0] && tarr[0] != 0){
	// int g = 0;
	// for(int k=0; k<temp-1; k++){
	// if(tarr[k] < tarr[k+1]){
	// g = 1;
	// }
	// tarr[k] = 0;
	// }
	// tarr[temp-1] = 0;
	// if(g == 0){
	// System.out.println(temp);
	// if(min > temp)
	// min = temp;
	// }
	// }
	// else{
	// for(int k=0; k<temp; k++)
	// tarr[k] = 0;
	// }
	// }
	// System.out.println(min);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// int n = Integer.valueOf(str);
	// int carry = 0;
	// int sum = 1;
	// for(int i=2; i<=n; i++){
	// if(i%3 == 0)
	// carry += i/3;
	// System.out.println(carry);
	// sum += carry;
	// }
	// System.out.println(sum);
	// }
	// bf.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// Map<String,Integer> map = new LinkedHashMap<String,Integer>();
	// while(in.hasNext()){
	// String s = in.next();
	// int line = in.nextInt();
	// String fname = s.substring(s.lastIndexOf("\\")+1);
	// if(fname.length()>16)
	// fname = fname.substring(fname.length()-16);
	// String key = fname + " " + line;
	// if(map.containsKey(key)){
	// map.put(key,map.get(key)+1);
	// }
	// else{
	// map.put(key, 1);
	// }
	// }
	// int count = 0;
	// Set<String> set = map.keySet();
	// for(String str: set){
	// count++;
	// if(count > (set.size()-8))
	// System.out.println(str+" "+map.get(str));
	// }
	// in.close();
	// }

	// public static void main(String[] args){
	//
	// int arr[] = {1,3,2,6,4,7,5,9,8,10,11};
	// System.out.println(middle(arr,7));
	// }
	// public static int middle(int array[],int n){
	//
	// for(int i=0; i<array.length; i++){
	// int sum = 0;
	// for(int j=0; j<array.length; j++){
	// if(array[i] > array[j]){
	// sum++;
	// }
	// }
	// if(sum == array.length/2){
	// return i;
	// }
	// }
	// return -1;
	// }

	// public static void main(String[] args) throws ClassNotFoundException{
	// // Class<StringUtil> s = StringUtil.class;
	// Class s = StringUtil.class;
	// Class s2 = s.getClass();
	// Class s3 = Class.forName("utils.StringUtil");
	// System.out.println(s3);
	// }

	// public static void main(String[] args){
	//
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// int dp[][] = new int[n+1][n+1];
	// int d[][] = new int[n+1][n+1];
	// for(int i=1; i<=n; i++){
	// for(int j=1; j<=i; j++){
	// d[i][j] = in.nextInt();
	// }
	// }
	// for(int i=1; i<=n; i++){
	// dp[n][i] = d[n][i];
	// }
	// for(int i=n-1; i>=1; i--){
	// for(int j=1; j<=i; j++){
	// dp[i][j] = d[i][j] + Math.max(dp[i+1][j],dp[i+1][j+1]);
	// }
	// }
	// System.out.println(dp[1][1]);
	// }
	// in.close();
	// }

	// public static void main(String[] args) {
	// int arr[] = {1,3,2,6,4,7,5};
	// insert_sort(arr,7);
	// for(int i=0; i<arr.length; i++){
	// System.out.print(arr[i]);
	// }
	// }
	//
	// //插入（升序）
	// public static void insert_sort(int array[], int n){
	// for(int i=1; i<array.length; i++){
	// for(int j=0; j<i; j++){
	// if(array[i] < array[j]){
	// int temp = array[i];
	// array[i] = array[j];
	// array[j] = temp;
	// }
	// }
	// }
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str;
	// while((str=bf.readLine()) != null){
	// int n = Integer.valueOf(str);
	// int cnt = 0;
	// while(n != 0){
	// int sum = 0;
	// for(int i=1; i<n; i++)
	// if(n%i == 0)
	// sum += i;
	// if(sum == n)
	// cnt++;
	// n--;
	// }
	// System.out.println(cnt);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String s;
	// while((s=bf.readLine())!=null){
	// int max = 0;
	// if(s.length() == 0)
	// continue;
	// for(int i=0; i<s.length(); i++){
	// for(int j=1; j<s.length()-i+1; j++){
	// StringBuffer sub = new StringBuffer(s.substring(i,i+j));
	// String rev = sub.reverse().toString();
	// if(sub.toString().equals(rev.toString())){
	// if(max < sub.length()){
	// max = sub.length();
	// }
	// }
	// }
	// }
	// System.out.println(max);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String s;
	// while((s=bf.readLine())!=null){
	// long m = Integer.valueOf(s);
	// long a = m*m-m+1;
	// System.out.print(a);
	// for(int i=1; i<m; i++){
	// System.out.print("+"+(a+=2));
	// }
	// System.out.println();
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// while(bf.readLine() != null){
	// for(int i=0; i<=100; i++){
	// int y = 100-7*i;
	// int z = 300+3*i;
	// if(y>=0 && z>=0 && y%4 == 0 && z%4 == 0){
	// System.out.println(i+" "+(y/4)+" "+(z/4));
	// }
	// }
	// }
	// bf.close();
	// }

	// public static void main(String[] args){
	// //直接每月累加 省一次for循环
	// // int days[] = {31,28,31,30,31,30,31,31,30,31,30,31};
	// int day[] = {0,31,59,90,120,151,181,212,243,273,304,334};
	// Scanner in = new Scanner(System.in);
	// int res;
	// while(in.hasNext()){
	// int y = in.nextInt();
	// int m = in.nextInt();
	// int d = in.nextInt();
	// res = 0;
	// //判年
	// if((y%4 == 0 && y%100 != 0) || y%400 == 0)
	// res++;
	// System.out.println(res);
	// //判月
	// res += day[m-1];
	// //日
	// System.out.println(res);
	// }
	// in.close();
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String s;
	// int cnt = 0;
	// int res = 0;
	// int temp = 0;
	// int days[] = {31,28,31,30,31,30,31,31,30,31,30,31};
	// while((s = bf.readLine()) != null){
	// cnt++;
	// //年
	// temp = Integer.valueOf(s);
	// if(cnt%3 == 1){
	// if((temp%4 == 0 && temp%100 != 0) || temp%400 == 0)
	// days[1] = 29;
	// else
	// days[1] = 28;
	// continue;
	// }
	// //月
	// else if(cnt%3 == 2){
	// for(int i=0; i<temp-1; i++){
	// res += days[i];
	// }
	// continue;
	// }
	// //日
	// else{
	// res += temp;
	// System.out.println(res);
	// res = 0;
	// cnt = 0;
	// continue;
	// }
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException{
	//
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String s;
	// while((s=bf.readLine()) != null){
	// int n = Integer.valueOf(s);
	// int sum = 0;
	// while(n != 0){
	// sum += n%2;
	// n = n/2;
	// }
	// System.out.println(sum);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) {
	// Scanner in = new Scanner(System.in);
	// int x = 0;
	// int y = 0;
	// while(in.hasNext()){
	// String str[] = in.nextLine().split(";");
	// for(int i=0; i<str.length; i++){
	// try{
	// int n = Integer.valueOf(str[i].substring(1));
	// char c = str[i].charAt(0);
	// if(c == 'A')
	// x -= n;
	// else if(c == 'D')
	// x += n;
	// else if(c == 'W')
	// y += n;
	// else
	// y -= n;
	// }
	// catch(Exception e){
	// continue;
	// }
	// }
	// }
	// System.out.println(x+" "+y);
	// in.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// int x = 0;
	// int y = 0;
	// while(in.hasNext()){
	// String str[] = in.nextLine().split(";");
	// //判断合法
	// for(int i=0; i<str.length; i++){
	// String temp = str[i];
	// if(temp.length() == 0)
	// continue;
	// char c = temp.charAt(0);
	// String sub = temp.substring(1);
	// if(c == 'A'){
	// int flag = 1;
	// for(int j=0; j<sub.length(); j++){
	// if(sub.charAt(j)<'0' ||sub.charAt(j)>'9'){
	// flag = 0;
	// break;
	// }
	// }
	// if(flag == 1){
	// x -= Integer.valueOf(sub);
	// }
	// }
	// if(c == 'S'){
	// int flag = 1;
	// for(int j=0; j<sub.length(); j++){
	// if(sub.charAt(j)<'0' ||sub.charAt(j)>'9'){
	// flag = 0;
	// break;
	// }
	// }
	// if(flag == 1){
	// y -= Integer.valueOf(sub);
	// }
	// }
	// else if(c == 'D'){
	// int flag = 1;
	// for(int j=0; j<sub.length(); j++){
	// if(sub.charAt(j)<'0' ||sub.charAt(j)>'9'){
	// flag = 0;
	// break;
	// }
	// }
	// if(flag == 1){
	// x += Integer.valueOf(sub);
	// }
	// }
	// if(c == 'W'){
	// int flag = 1;
	// for(int j=0; j<sub.length(); j++){
	// if(sub.charAt(j)<'0' ||sub.charAt(j)>'9'){
	// flag = 0;
	// break;
	// }
	// }
	// if(flag == 1){
	// y += Integer.valueOf(sub);
	// }
	// }
	// }
	// }
	// System.out.println(x + " " + y);
	// in.close();
	// }

	// public static void main(String[] args) {
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// if(n < 1){
	// System.out.println(-1);
	// }
	// else{
	// System.out.println((3*n*n+1)/2);
	// }
	// }
	// in.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// List<String > list = new ArrayList<String>();
	// for(int i=0; i<n; i++){
	// list.add(in.next());
	// }
	// Collections.sort(list);
	// Iterator<String> it = list.iterator();
	// while(it.hasNext()){
	// System.out.println(it.next());
	// }
	// }
	// in.close();
	// }

	// public static void main(String[] args) {
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// String str = in.next();
	// Set<Character> set = new HashSet<Character>();
	// for(int i=0; i<str.length(); i++){
	// set.add(str.charAt(i));
	// }
	// System.out.println(set.size());
	// }
	// in.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// TreeMap<Integer,Integer> map = new TreeMap<Integer,Integer>();
	// for(int i=0; i<n; i++){
	// int a = in.nextInt();
	// int b = in.nextInt();
	// if(map.containsKey(a)){
	// map.put(a, map.get(a)+b);
	// }
	// else{
	// map.put(a,b);
	// }
	// }
	// Set<Integer> set= map.keySet();
	// for(Integer i: set){
	// System.out.println(i + " " + map.get(i));
	// }
	// }
	// in.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNextLong()){
	// long num = in.nextLong();
	// System.out.println(getResult(num));
	// }
	// in.close();
	// }
	//
	// public static String getResult(long num){
	//
	// String res = "";
	// while(num != 1){
	// for(int i=2; i<=num; i++){
	// if(num%i == 0){
	// num /= i;
	// res += i+" ";
	// break;
	// }
	// }
	// }
	// return res;
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// StringBuffer sb = new StringBuffer(in.nextLine().substring(2)).reverse();
	// int cnt = 0;
	// int res = 0;
	// for(int i=0; i<sb.length(); i++){
	// char c = sb.charAt(i);
	// int temp;
	// if(c >='A' && c <='F')
	// temp = c-'A'+10;
	// else if(c >='a' && c <='f')
	// temp = c-'a'+10;
	// else
	// temp = c;
	// do{
	// res += temp%2*Math.pow(2,cnt);
	// temp = temp/2;
	// cnt++;
	// }while(cnt%4 != 0);
	// }
	// System.out.println(res);
	// }
	// in.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// Set<Integer> set = new TreeSet<Integer>();
	// for(int i=0; i<n; i++){
	// set.add(in.nextInt());
	// }
	// Iterator<Integer> it = set.iterator();
	// while(it.hasNext()){
	// System.out.println(it.next());
	// }
	// }
	// in.close();
	// }

	// public static void main(String[] args) {
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// int sum = 0;
	// for(int i=1; i<=n; i++){
	// if(i%7 == 0){
	// sum++;
	// }
	// else{
	// String temp = String.valueOf(i);
	// if(temp.indexOf('7') != -1){
	// sum++;
	// }
	// }
	// }
	// System.out.println(sum);
	// }
	// in.close();
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// System.out.println(n/2);
	// }
	// in.close();
	// }

	// public static void main(String[] args) {
	//
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// String str = in.next().toUpperCase();
	// char c = in.next().toUpperCase().toCharArray()[0];
	// int sum = 0;
	// for(int i=0; i<str.length(); i++){
	// char tc = str.charAt(i);
	// if(tc == c)
	// sum++;
	// }
	// System.out.println(sum);
	// }
	// in.close();
	// }

	// public static void main(String[] args) {
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// String str = in.next();
	// StringBuffer sb = new StringBuffer();
	// for(int i=str.length()-1; i>=0; i--){
	// char c = str.charAt(i);
	// if(c >='0' && c<='9'){
	// sb.append(c);
	// str = str.replace(c+"","a");
	// }
	// }
	// System.out.println(sb.toString());
	// }
	// in.close();
	// }

	// public static void main(String[] args) {
	//
	// Scanner in = new Scanner(System.in);
	// int m = in.nextInt();
	// int n = in.nextInt();
	// System.out.println(getf(m,n));
	// in.close();
	// }
	// public static int getf(int m, int n){
	// if(m == 0 || n == 0)
	// return 1;
	// return getf(m,n-1)+getf(m-1,n);
	// }

	// public static void main(String[] args) {
	//
	// Scanner in = new Scanner(System.in);
	// String
	// s1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	// String s2
	// ="bcdefghijklmnopqrstuvwxyza222333444555666777788899990123456789";
	// while (in.hasNext()) {
	// String str = in.next();
	// for(int i=0; i<str.length(); i++){
	// str = str.substring(0,i)+
	// str.substring(i,i+1).replace(str.charAt(i)+"",s2.charAt(s1.indexOf(str.charAt(i)))+"")+
	// str.substring(i+1);
	// }
	// System.out.println(str);
	// }
	// in.close();
	// }

	// public static void main(String[] args) {
	// Scanner in = new Scanner(System.in);
	// while (in.hasNext()) {
	// String str = in.next();
	// Map<Character, Integer> map = new HashMap<Character, Integer>();
	// int min = 100000;
	// for (int i = 0; i < str.length(); i++) {
	// char c = str.charAt(i);
	// if (map.containsKey(c)) {
	// int val = map.get(c);
	// map.put(c, val + 1);
	// if (val < min)
	// min = val;
	// continue;
	// }
	// map.put(c, 0);
	// min = 0;
	// }
	// Set<Character> set = map.keySet();
	// Iterator<Character> it = set.iterator();
	// while (it.hasNext()) {
	// char c = it.next();
	// if (map.get(c) == min)
	// str = str.replaceAll("[" + c + "]*", "");
	// }
	// System.out.println(str);
	// }
	// }

	// public static void main(String[] args){
	// Scanner in = new Scanner(System.in);
	// while(in.hasNext()){
	// int n = in.nextInt();
	// if(n <= 2){
	// System.out.println(-1);
	// }
	// else if(n%2 == 0){
	// System.out.println(3);
	// }
	// else
	// System.out.println(2);
	// }
	// }

	// public static void main(String[] args) throws IOException{
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str[] = bf.readLine().split(" ");
	// int m = Integer.valueOf(str[0]);
	// int n = Integer.valueOf(str[1]);
	// System.out.println(count(m,n));
	// bf.close();
	// }
	//
	// public static int count(int m,int n){
	// if(m<0)
	// return 0;
	// if(m == 0 || n == 1)
	// return 1;
	// return count(m,n-1)+count(m-n,n);
	// }

	// public static void main(String[] args) throws IOException{
	//
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String str[] = bf.readLine().split("\"");
	// int cnt = 0;
	// String res[] = new String[10000];
	// for(int i=0; i<str.length; i++){
	// str[i] = str[i].trim();
	// if((i+1)%2 == 0){
	// res[cnt++] = str[i];
	// continue;
	// }
	// else{
	// String temp[] = str[i].split(" ");
	// for(int j=0; j<temp.length; j++)
	// res[cnt++] = temp[j];
	// }
	// }
	//
	// System.out.println(cnt);
	// for(int i=0; i<cnt; i++){
	// System.out.println(res[i]);
	// }
	// bf.close();
	// }

	// public static void main(String[] args) throws IOException {
	// BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	// String s1 = bf.readLine();
	// String s2 = bf.readLine();
	// splstr(s1);
	// splstr(s2);
	// bf.close();
	// }
	//
	// public static void splstr(String str){
	// int len = str.length();
	// if(len < 8 || len%8 != 0){
	// if(len == 0)
	// return ;
	// str += "00000000";
	// len += 8;
	// }
	// while(len>=8){
	// System.out.println(str.substring(0,8));
	// str = str.substring(8);
	// len = str.length();
	// }
	// }

	/**
	 * 计负均正 public static void main(String[] args){
	 * 
	 * Scanner in = new Scanner(System.in); int n ; int sum = 0; int cnt = 0;
	 * double res = 0; while(in.hasNext()){ n = in.nextInt(); if(n < 0){ sum++;
	 * continue; } cnt++; res += n; } System.out.println(sum);
	 * System.out.printf("%.1f",(cnt==0?cnt:res/cnt)); }
	 **/
}
/**
 * 最小公倍数 public static void main(String[] args){ Scanner in = new
 * Scanner(System.in); int a = in.nextInt(); int b = in.nextInt(); if(a < b){ a
 * = a+b; b = a-b; a = a-b; } int res = 0; long c = a*b; while(b != 0){ res = b;
 * b = a%b; a = res; System.out.println("a="+a+"b="+b); }
 * System.out.println("c="+c+"  res="+res+"  "+c/res); in.close(); }
 **/
/**
 * 保留最大的数 public static void main(String[] args) throws IOException {
 * 
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
 * String n = bf.readLine(); int t = Integer.valueOf(bf.readLine()); while(t !=
 * 0){ int len = n.length()-1; int didx = 0; while(didx < len &&
 * n.charAt(didx)>n.charAt(didx+1)) didx++; n =
 * n.substring(0,didx)+n.substring(didx+1); t--; } System.out.println(n); }
 **/
/**
 * 保留最大的数 public static void main(String[] args) throws IOException {
 * 
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
 * String n = bf.readLine(); int t = Integer.valueOf(bf.readLine()); String max;
 * int idx; while(t != 0){ max = ""; idx = -1; for(int i=0; i<n.length(); i++){
 * String temp = n.substring(0,i) + n.substring(i+1); if(temp.compareTo(max) >
 * 0){ max = temp; idx = i; } } n = n.substring(0,idx) + n.substring(idx+1);
 * t--; } System.out.println(n); }
 **/
/**
 * 三个数 public static void main(String[] args) throws IOException {
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
 * String str[] = bf.readLine().split(" "); String res = ""; for(int i=1;
 * i<str.length; i++){ int p = Integer.valueOf(str[i-1]); int n =
 * Integer.valueOf(str[i]); while(p+1 != n){ res += p+1; p++; } } long resi =
 * Long.valueOf(res)%7; System.out.println(resi); }
 **/
/**
 * 数的高度 //50 8896 public static void main(String[] args) throws
 * NumberFormatException, IOException {
 * 
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in)); int
 * n = Integer.valueOf(bf.readLine()); //记录指定结点所处深度和子节点个数 HashMap<Integer,
 * Integer> deep = new HashMap<>(); //每个结点所处的深度 HashMap<Integer, Integer>
 * childnum = new HashMap<>(); //每个结点的子节点个数（子节点数已经为2了的跳过） deep.put(0,1);
 * childnum.put(0,0); int max = 1; int mydeep = 0; for(int i=0; i<n-1; i++){
 * String inarr[] = bf.readLine().split(" "); int parent =
 * Integer.valueOf(inarr[0]); int child = Integer.valueOf(inarr[1]);
 * //当前还并不存在该父节点或者子节点个数已经到2了的跳过 if(!deep.containsKey(parent) ||
 * childnum.get(parent) == 2) continue; //临时深度变成当前父节点的深度+1（因为有子节点） mydeep =
 * deep.get(parent) + 1; //保存parent和child deep.put(child,mydeep);
 * childnum.put(parent, childnum.get(parent)+1); childnum.put(child, 0);
 * if(mydeep > max) max = mydeep; } System.out.println(max); bf.close(); }
 **/
/**
 * 优雅的点 83 9000多呢 75 public static int n = 0; public static void main(String[]
 * args) throws IOException{
 * 
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in)); n =
 * Integer.valueOf(bf.readLine()); int max = (int) Math.sqrt(n); int sum = 0;
 * for(int i=-max; i<=max; i++){ sum += add(i); } System.out.println(sum);
 * bf.close(); } public static int add(int i){ double p = Math.sqrt(n-i*i);
 * double q = Math.ceil(p); if((int)p != (int)q) return 0; if(n == i*i) return
 * 1; return 2; }
 **/
/**
 * 数串 37 371 public static void main(String[] args) throws
 * NumberFormatException, IOException {
 * 
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
 * Integer.valueOf(bf.readLine()); String sarr[] = bf.readLine().split(" ");
 * Arrays.sort(sarr,new Comparator<String>(){ public int compare(String s1,
 * String s2) { return (s2+s1).compareTo(s1+s2); } }); for(int i=0;
 * i<sarr.length; i++) System.out.print(sarr[i]); bf.close(); }
 **/
/**
 * 统计字符 public static void main(String[] args) throws IOException {
 * 
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
 * char[] c = bf.readLine().toCharArray(); Map<Character,Integer> map = new
 * HashMap<Character,Integer>(); for(int i=0; i<c.length; i++){
 * if(!(c[i]>='a'&&c[i]<='z') && !(c[i]>='A'&&c[i]<='z')) continue;
 * if(!map.containsKey(c[i])){ map.put(c[i], 1); } else{ int val =
 * map.get(c[i])+1; if(val == 3){ System.out.println(c[i]); break; }
 * map.put(c[i],val); } } bf.close(); }
 **/
/**
 * 字符串中找出连续最长的数字串 public static void main(String[] args) throws IOException{
 * 
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
 * String str = bf.readLine(); int res = 0; int temp = 0; String str1 = "";
 * String stem = ""; for(int i=0; i<str.length(); i++){ if(str.charAt(i) >= '0'
 * && str.charAt(i) <= '9'){ stem += str.charAt(i); temp++;
 * if(i==str.length()-1){ if(temp > res){ res = temp; str1 = stem; stem = ""; }
 * } } else{ if(temp > res){ res = temp; str1 = stem; stem = ""; } stem=""; temp
 * = 0; } } System.out.println(str1); bf.close(); str = null; str1 = null; stem
 * = null; }
 **/
/**
 * 倒置字符串 public static void main(String[] args) throws IOException {
 * 
 * BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
 * String str[] = bf.readLine().split(" "); for(int i=str.length-1; i>0; i--){
 * System.out.print(str[i] + " "); } System.out.println(str[0]); bf.close(); str
 * = null; }
 **/
/**
 * 进制转换 public static void main(String[] args) throws IOException {
 * 
 * BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
 * String[] nums = br.readLine().split(" "); int m = Integer.valueOf(nums[0]);
 * int n = Integer.valueOf(nums[1]); StringBuffer sb = new StringBuffer();
 * char[] arr = {'A','B','C','D','E','F'}; int temp = 0; boolean fs = false;
 * if(m < 0){ fs = true; m = -m; } while(m != 0){ temp = m%n; if(temp > 9)
 * sb.append(arr[temp-9-1]); else sb.append(temp); m = m/n; } if(fs)
 * sb.append("-"); System.out.println(sb.reverse().toString()); }
 **/
/**
 * 水仙花数 public static void main(String[] args) throws IOException {
 * BufferedReader bf=new BufferedReader(new InputStreamReader(System.in));
 * String line=bf.readLine(); String[] nums=line.split(" ");
 * 
 * int m=Integer.parseInt(nums[0]); int n=Integer.parseInt(nums[1]); boolean
 * isfirst = true; for(int i=m; i<=n; i++){ int g = i%10; int s = i/10%10; int b
 * = i/100; if(g*g*g+s*s*s+b*b*b == i){ if(isfirst){ System.out.print(i);
 * isfirst = false; } else System.out.print(" "+i); } } if(isfirst){
 * System.out.println("no"); } }
 **/
/**
 * 整数加法 public static void main(String[] args) { Scanner in = new
 * Scanner(System.in); while(in.hasNext()){ String a = in.next(); String b =
 * in.next(); int len = a.length(); int more = 0; if(a.length() < b.length()){
 * len = b.length(); more = 1; } boolean ok = true; //非法字符串判断 for(int i=0;
 * i<len; i++){ if(i<a.length() && !(a.charAt(i)>='0' && a.charAt(i)<='9')){
 * System.out.println("error"); ok = false; break; } if(i<b.length() &&
 * !(b.charAt(i)>='0' && b.charAt(i)<='9')){ System.out.println("error"); ok =
 * false; break; } } if(ok == false) continue; //字符串后半部分相加:a更长 int carry = 0;
 * String res = ""; if(more == 0){ for(int i=len-1,j=b.length()-1; j>=0; j--){
 * int sum = Integer.valueOf(a.charAt(i--)+"") + Integer.valueOf(b.charAt(j)+"")
 * + carry; // System.out.println("sum="+sum); carry = sum/10; res += sum%10; //
 * System.out.println("res="+res); // System.out.println("carry="+carry); }
 * for(int i=len-b.length()-1; i>=0; i--){ int sum =
 * Integer.valueOf(a.charAt(i)+"") + carry; carry = sum/10; res += sum%10; //
 * System.out.println("res="+res); } res += carry; System.out.println(new
 * StringBuffer(res).reverse().toString().replaceAll("^[0]*","")); }
 * 
 * //字符串后半部分相加:b更长 else{ for(int i=len-1,j=a.length()-1; j>=0; j--){ int sum =
 * Integer.valueOf(b.charAt(i--)+"") + Integer.valueOf(a.charAt(j)+"") + carry;
 * // System.out.println("sum="+sum); carry = sum/10; res += sum%10; //
 * System.out.println("res="+res); // System.out.println("carry="+carry); }
 * for(int i=len-a.length()-1; i>=0; i--){ int sum =
 * Integer.valueOf(b.charAt(i)+"") + carry; carry = sum/10; res += sum%10; //
 * System.out.println("res="+res); } res += carry; System.out.println(new
 * StringBuffer(res).reverse().toString().replaceAll("^[0]*","")); } } }
 **/
/**
 * 集合 public static void main(String[] args){ Scanner in = new
 * Scanner(System.in); TreeSet<Integer> set = new TreeSet<Integer>();
 * while(in.hasNext()){ int m = in.nextInt(); int n = in.nextInt(); for(int i=1;
 * i<=m+n; i++){ set.add(in.nextInt()); } Iterator<Integer> it = set.iterator();
 * while(it.hasNext()){ System.out.print(it.next()); if(it.hasNext())
 * System.out.print(" "); } } }
 **/
/**
 * 最强大脑 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); while(in.hasNext()){ String str =
 * in.nextLine(); String a = in.nextLine(); String b = in.nextLine(); boolean nx
 * = nx(str,a,b); boolean sx = sx(str,a,b); if(nx && sx)
 * System.out.println("both"); else if(nx) System.out.println("backward"); else
 * if(sx) System.out.println("forward"); else System.out.println("invalid"); } }
 * 
 * //逆序判段 public static boolean nx(String str,String a,String b){ int aidx =
 * str.lastIndexOf(a); int bidx = str.indexOf(b); if(aidx != -1 && bidx != -1 &&
 * bidx+b.length()-1 < aidx) return true; return false; }
 * 
 * //顺序判断 public static boolean sx(String str,String a,String b){ int aidx =
 * str.indexOf(a); int bidx = str.lastIndexOf(b); if(aidx != -1 && bidx != -1 &&
 * aidx+a.length()-1 < bidx) return true; return false; }
 **/
/**
 * 分苹果 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); while (in.hasNext()) { int n =
 * Integer.valueOf(in.nextLine()); int arr[] = new int[n + 1]; int sum = 0; int
 * total = 0; while (n != 0) { arr[n] = in.nextInt(); total += arr[n]; n--; }
 * if(total%(arr.length-1) != 0){ System.out.println(-1); continue; } int avg =
 * total/(arr.length-1); boolean ok = true; for(int i=1; i<=arr.length-1; i++){
 * if ((arr[i] - avg) % 2 != 0) ok = false; else if ((arr[i] - avg) / 2 > 0) {
 * sum += (arr[i] - avg) / 2; } } if (ok) System.out.println(sum); else
 * System.out.println(-1); } }
 **/
/**
 * geohash编码 public static void main(String[] args){
 * 
 * Scanner in = new Scanner(System.in); while(in.hasNext()){ int n =
 * in.nextInt(); int l = -90; int r = 90; boolean temp = true; while(temp ==
 * true){ int c = r-(r-l)/2; if(r > 0) c = (r-l)/2+l;
 * System.out.println("l="+l+" r="+r+" c="+c+" n="+n); if(l <= n && c > n){
 * System.out.print(0); if(c-l < 6 && r-c < 6) temp = false; r = c; } else{
 * System.out.print(1); if(c-l < 6 && r-c < 6) temp = false; l = c; } } } }
 **/
/**
 * 进制均值 public static void main(String[] args){
 * 
 * Scanner in = new Scanner(System.in); while(in.hasNext()){ int n =
 * in.nextInt(); int sum = 0; for(int i=2; i<=n-1; i++){ sum += jzh(n,i); } int
 * gys = gy(sum, n-2); System.out.println(sum/gys + "/" +(n-2)/gys); }
 * 
 * }
 * 
 * //求最大公约数 public static int gy(int a, int b){
 * 
 * if(a > b){ a = a+b; b = a-b; a = a-b; } while(a != 0){ int c = b%a; b = a; a
 * = c; } return b; }
 * 
 * //求进制和 public static int jzh(int n,int m){
 * 
 * int sum = 0; while(n != 0){ sum += n%m; n /= m; } return sum; }
 **/
/**
 * 两种排序方法 public static void main(String[] args) { Scanner in = new
 * Scanner(System.in); while(in.hasNext()){ int n =
 * Integer.valueOf(in.nextLine()); String str[] = new String[n+1]; for(int i=1;
 * i<=n; i++){ str[i] = in.nextLine(); } boolean zd = iszd(str); boolean cd =
 * iscd(str); if(zd && cd) System.out.println("both"); else if(zd)
 * System.out.println("lexicographically"); else if(cd)
 * System.out.println("lengths"); else System.out.println("none"); } }
 * 
 * //字典判断 public static boolean iszd(String[] str){ for(int i=1; i<str.length-1;
 * i++){ if(str[i].compareTo(str[i+1]) >= 0) return false; } return true; }
 * 
 * //字符串长度判断 public static boolean iscd(String[] str){
 * 
 * for(int i=1; i<str.length-1; i++){ if(str[i].length() >= str[i+1].length())
 * return false; } return true; }
 **/
/**
 * 阶乘末尾0的个数 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); while(in.hasNext()){ int n =
 * in.nextInt(); int sum = 0; for(int i=5; i<=n; i++){ int temp = i;
 * while(temp%5 == 0){ sum++; temp /= 5; } } System.out.println(sum); } }
 **/

/**
 * 计算糖果 public static void main(String[ ] args){
 * 
 * Scanner in = new Scanner(System.in); while(in.hasNext()){ int a =
 * in.nextInt(); int b = in.nextInt(); int c = in.nextInt(); int d =
 * in.nextInt(); int x = (c+a)/2; int y = (c-a)/2; int z = (c-a-2*b)/2; if(x-y
 * == a && x+y == c && y-z == b && y+z == d && x*2 == a+c && y*2 == c-a && z*2
 * == c-a-2*b){ System.out.println(x + " " + y + " " + z); } else{
 * System.out.println("No"); } } }
 **/
/**
 * 拼凑面额 public static void main(String[] args) { Scanner in = new
 * Scanner(System.in); int arr[] = {1,5,10,20,50,100}; while(in.hasNext()){ int
 * n = in.nextInt(); long res[] = new long[n+1]; res[0] = 1L;
 * 
 * for(int i=0; i<arr.length; i++){ for(int j=1; j<=n; j++){ if(j >= arr[i]){
 * res[j] += res[j-arr[i]]; } } }
 * 
 * System.out.println(res[n]); } }
 **/
/**
 * 句子反转 public static void main(String[] args) { Scanner in = new
 * Scanner(System.in); while(in.hasNext()){ String str = in.nextLine(); String
 * arr[] = str.split(" "); StringBuffer res = new StringBuffer(); for(int
 * i=arr.length-1; i>0; i--){ res.append(arr[i]+" "); } res.append(arr[0]);
 * System.out.println(res.toString()); } }
 **/
/**
 * 删除公共字符 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); while (in.hasNext()) { String str1 =
 * in.nextLine(); String str2 = in.nextLine(); String pattern = "["+str2+"]";
 * str1 = str1.replaceAll(pattern, ""); System.out.println(str1); } }
 **/
/**
 * 构造队列 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); int t = in.nextInt();
 * LinkedList<Integer> res; while(t != 0){ int n = in.nextInt(); res =
 * getRes(n); for(int i=0; i<n-1; i++){ System.out.print(res.removeFirst() +
 * " "); } System.out.println(res.removeFirst()); t--; } } public static
 * LinkedList<Integer> getRes(int n){ LinkedList<Integer> head = new
 * LinkedList<Integer>(); for(int i=n; i>0; i--){ head.addFirst(i);
 * head.addFirst(head.removeLast()); } return head; }
 **/

/**
 * 数列还原 public static void main(String[] args){
 * 
 * Scanner in =new Scanner(System.in); while(in.hasNext()) { int n =
 * in.nextInt(); int k = in.nextInt(); int a[] = new int[n+1]; for(int i=1;
 * i<=n; i++){ a[i] = in.nextInt(); } } }
 **/
/**
 * 求数列的和 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in);
 * 
 * while(in.hasNext()){ double n = in.nextDouble(); double m = in.nextDouble();
 * double sum = 0; for(int i=1; i<=m ;i++){ sum += n; n = Math.sqrt(n); }
 * System.out.printf("%.2f",sum); } }
 **/
/**
 * n个数里出现次数大于长度的一般的数 public static void main(String[] args ){
 * 
 * Scanner in = new Scanner(System.in); int n = 0; HashMap<Integer, Integer> map
 * = new HashMap<Integer, Integer>(); while(in.hasNext()){ int num =
 * in.nextInt(); n++; if(map.containsKey(num)){ int count = map.get(num);
 * count++; map.remove(num); map.put(num, count); } else{ map.put(num, 1); } }
 * in.close();
 * 
 * Set<Integer> keyset = map.keySet(); for(Integer num: keyset){ int count =
 * map.get(num); if(count >= n/2){ System.out.println(num); return ; } } }
 **/
/**
 * 不要2 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); int row = in.nextInt(); int col =
 * in.nextInt();
 * 
 * int[][] grid = new int[row][col]; //横向判断蛋糕位置 for(int i=0; i<row; i++){ if(i%4
 * == 0 || i%4 == 1){ for(int j=0; j<col; j++){ if(j%4 == 0 || j%4 == 1){
 * grid[i][j] = 1; } } } //纵向判断蛋糕位置 else{ for(int j=0; j<col; j++){ if(j%4 ==2
 * || j%4 == 3){ grid[i][j] = 1; } } } } int sum = 0; for(int i=0; i<row; i++){
 * for(int j=0; j<col; j++){ if(grid[i][j] == 1){ sum++; } } }
 * System.out.println(sum); }
 **/
/**
 * 彩色宝石项链 需要好好体会 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); while(in.hasNext()){ String str =
 * in.nextLine(); System.out.println(mine(str)); } }
 * 
 * public static int mine(String str){
 * 
 * char strchar[] = str.toCharArray(); int len = strchar.length;
 * 
 * if(len <= 5){ return 0; }
 * 
 * for(int i=5; i<len; i++){ for(int j=0; j<len; j++){ StringBuffer temp = new
 * StringBuffer(); for(int k=j; k<j+i; k++){ temp.append(strchar[k%len]); }
 * String t = temp.toString(); if(t.contains("A") && t.contains("B") &&
 * t.contains("C") && t.contains("D") && t.contains("E")){
 * System.out.println(t); return len-i; } } }
 * 
 * return 0; }
 **/
/**
 * 藏宝图不连续子序列判断 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); String s = in.next(); String t =
 * in.next();
 * 
 * boolean lx = true; for(int i=0; i<t.length(); i++){ int pos =
 * s.indexOf(t.charAt(i)); if(pos != -1){ s = s.substring(pos+1); } else{ lx =
 * false; break; } } if(lx){ System.out.println("Yes"); } else{
 * System.out.println("No"); } }
 **/
/**
 * 文件扩展名filename public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); String filepath = in.next(); int pos =
 * filepath.lastIndexOf("."); if(pos == -1 || filepath.charAt(pos+1) == '/'){
 * System.out.println("null"); return ; }
 * System.out.println(filepath.substring(pos+1)); }
 **/
/**
 * 素数对 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); int n = in.nextInt(); int sum = 0;
 * for(int i=2; i<=n/2; i++){ if(isss(i) && isss(n-i)){ sum++; } }
 * System.out.println(sum); }
 * 
 * //判断是否为素数 public static boolean isss(int n){ if(n == 2 || n == 3 || n == 5 ||
 * n == 7) return true; if(n%2 != 0 && n%3 != 0 && n%5 != 0 && n%7 != 0) return
 * true; return false; }
 **/
/**
 * 买苹果之捆绑交易 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); int n = in.nextInt(); int temp = n;
 * for(int i=n/8; i>=0; i--){ temp = n-8*i; if(temp%6 == 0){
 * System.out.println(i+temp/6); return; } } System.out.println(-1); }
 **/
/**
 * 回文统计 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); String a = in.next(); String b =
 * in.next();
 * 
 * int sum = 0; for(int i=0; i<=a.length(); i++){ String res = a.substring(0,i)
 * + b + a.substring(i); StringBuffer str = new StringBuffer(res);
 * str.reverse(); System.out.println(res); System.out.println(str);
 * if(ishw(res)){ sum++; } } System.out.println(sum); }
 * 
 * //判断是否为回文 public static boolean ishw(String str) { String rev = ""; for(int
 * i=str.length()-1; i>=0; i--){ rev += str.charAt(i); } if(rev.equals(str)){
 * return true; } return false; }
 **/
/**
 * 小易喜欢的单词 public static void main(String[] args){
 * 
 * Scanner in = new Scanner(System.in); String str = in.next(); boolean like =
 * true; if(str.matches("[A-Z]+")){ for(int i=1; i<str.length(); i++){
 * if(str.charAt(i) == str.charAt(i-1)){ like = false; break; } } if(like ==
 * false){ System.out.println("Dislikes"); } else{ System.out.println("Likes");
 * } } else{ System.out.println("Dislikes"); } }
 **/
/**
 * 数字反转 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); int x = in.nextInt(); int y =
 * in.nextInt(); String xstr = String.valueOf(x); String ystr =
 * String.valueOf(y); x = Integer.valueOf(reverse(xstr)); y =
 * Integer.valueOf(reverse(ystr));
 * 
 * int result = x + y; System.out.println(reverse(String.valueOf(result))); }
 * 
 * public static String reverse(String num){
 * 
 * int len = num.length(); int ceil = 1; int rx = 0; for(int i=0; i<len; i++){
 * rx += Integer.parseInt(num.charAt(i)+"") * ceil; ceil *= 10; } return
 * String.valueOf(rx); }
 **/
/**
 * 幸运数 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); int n = in.nextInt(); int f, g,sum; sum
 * = 0; for(int i=1; i<=n; i++){ f = 0; g = 0; //计算f的值 String nstr =
 * String.valueOf(i); for(int j=0; j<nstr.length(); j++){ int x =
 * Integer.parseInt(nstr.charAt(j) + ""); f += x; } //计算g的值 int j = i; while(j
 * != 0){ int y = j%2; g += y; j /= 2; }
 * 
 * if(f == g){ sum++; } } System.out.println(sum); }
 **/
/**
 * 下厨房 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); HashSet<String> set = new
 * HashSet<String>();
 * 
 * while(in.hasNext()){ String str = in.nextLine(); String arr[] =
 * str.split(" "); for(int i=0; i<arr.length; i++){ set.add(arr[i]); } }
 * 
 * System.out.println(set.size()); set.clear(); }
 **/
/**
 * 网格走法数目 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); int m,n; m = in.nextInt(); n =
 * in.nextInt(); int f[][] = new int[11][11]; f[0][0] = 0; for(int i=0; i<=m;
 * i++) f[i][0] = 1; for(int i=0; i<=n; i++) f[0][i] = 1; for(int i=1; i<=m;
 * i++){ for(int j=1; j<=n; j++) f[i][j] = f[i-1][j] + f[i][j-1]; }
 * System.out.print(f[m][n]); }
 **/

/**
 * 身份证分类 public static void main(String[] args) {
 * 
 * Scanner in = new Scanner(System.in); String str = in.nextLine(); str =
 * str.replace(" ",""); int len = str.length(); for(int i=0; i<len; ){
 * System.out.print(str.charAt(i)); i++; if(i == 6 || i == 14){
 * System.out.print(" "); } } }
 **/
/**
 * 游戏任务标记 public static void main(String[] args){
 * 
 * Scanner in = new Scanner(System.in);
 * 
 * int a = in.nextInt(); int b = in.nextInt();
 * 
 * if(a>1024 || a<1 || b>1024 || b<1) { System.out.println(-1); } else if(a !=
 * b){ System.out.println(0); } else{ System.out.println(1); } }
 **/
/**
 * F数 public static void main(String[] args) {
 * 
 * int f[] = new int[1000]; f[0] = 0; f[1] = 1;
 * 
 * Scanner in = new Scanner(System.in); int n = in.nextInt();
 * 
 * int dis = n-f[1]; if(dis < 0){ dis = -dis; } int i = 2; while(true){ f[i] =
 * f[i-1] + f[i-2]; int temp = n-f[i]; if(temp < 0){ temp = -temp; } if(temp >
 * dis){ System.out.println(dis); return ; } dis = temp; i++; } }
 **/

/**
 * 解救小易 public static void main(String[] args){
 * 
 * int n; int a[] = new int[1000]; int b[] = new int[1000];
 * 
 * Scanner in = new Scanner(System.in); n = in.nextInt(); for(int i=1; i<=n;
 * i++){ a[i] = in.nextInt(); } for(int i=1; i<=n; i++){ b[i] = in.nextInt(); }
 * 
 * int dis = 2000; for(int i=1; i<=n; i++){ if(dis > a[i]+b[i]) dis = a[i] +
 * b[i]; }
 * 
 * System.out.print(dis-2);
 * 
 * }
 **/


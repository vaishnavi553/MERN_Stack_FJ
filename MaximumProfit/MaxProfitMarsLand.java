import java.util.Scanner;

public class MaxProfitMarsLand {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Time Unit: ");
        int n = scanner.nextInt();

        int[] time = {5, 4, 10};
        int[] earnings = {1500, 1000, 3000};

        int[] dp = new int[n + 1];
        int[] tCount = new int[n + 1];
        int[] pCount = new int[n + 1];
        int[] cCount = new int[n + 1];  

        for (int t = 1; t <= n; t++) {
            for (int i = 0; i < 3; i++) {
                if (t >= time[i]) {
                    int newProfit = dp[t - time[i]] + earnings[i];

                    if (newProfit > dp[t]) {
                        dp[t] = newProfit;
                        tCount[t] = tCount[t - time[i]];
                        pCount[t] = pCount[t - time[i]];
                        cCount[t] = cCount[t - time[i]];

                        if (i == 0) tCount[t]++;
                        else if (i == 1) pCount[t]++;
                        else cCount[t]++;
                    }
                }
            }
        }

        System.out.println("Earnings: $" + dp[n]);
        System.out.println("T: " + tCount[n] + " P: " + pCount[n] + " C: " + cCount[n]);
        scanner.close();

    }
}

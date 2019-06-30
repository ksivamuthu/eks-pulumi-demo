import * as pulumi from "@pulumi/pulumi";
import * as eks from "@pulumi/eks";
import * as awsx from "@pulumi/awsx";
import * as k8s from "@pulumi/kubernetes";
import { LocalChartOpts } from "@pulumi/kubernetes/helm/v2";

const name = "k8s-nodejs";

const vpc = new awsx.ec2.Vpc("VPC", { subnets: [{ type: "public" }] });
const cluster = new eks.Cluster(name, {
    vpcId: vpc.id,
    subnetIds: vpc.publicSubnetIds,
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
    storageClasses: "gp2",
    deployDashboard: false,
});

// Export the clusters' kubeconfig.
export const kubeconfig = cluster.kubeconfig;

const localChartOpts: LocalChartOpts = {
    path: '../coffee-api-helm'
};

const coffeeApi = new k8s.helm.v2.Chart('coffee-api', localChartOpts, {
    providers: {
        kubernetes: cluster.provider
    }
});
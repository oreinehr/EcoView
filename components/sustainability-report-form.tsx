import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "../hooks/use-toast.ts";

// Definindo o esquema de validação para o formulário
const formSchema = z.object({
  companyName: z.string().min(2, { message: "O nome da empresa deve ter pelo menos 2 caracteres." }),
  companySector: z.string().min(2, { message: "O setor de atuação da empresa deve ser informado." }),

  // Governança e Gestão
  sustainabilityPolicy: z.string().optional(),
  integratedSustainability: z.string().optional(),

  // Desempenho Ambiental
  environmentalPractices: z.string().optional(),
  environmentalIndicators: z.string().optional(),
  environmentalResults: z.string().optional(),
  environmentalCertifications: z.string().optional(),

  // Desempenho Social
  humanRightsPolicies: z.string().optional(),
  socialInitiatives: z.string().optional(),
  employeeSatisfaction: z.string().optional(),

  // Desempenho Econômico
  sustainableInvestments: z.string().optional(),
  sustainabilityFinancialGoals: z.string().optional(),

  // Cadeia de Suprimentos
  supplierSustainabilityEvaluations: z.string().optional(),

  // Conformidade Legal e Normativa
  applicableLaws: z.string().optional(),

  // Metas Futuras e Compromissos
  futureSustainabilityGoals: z.string().optional(),

  // Comunicação e Transparência
  communicationWithStakeholders: z.string().optional(),
  stakeholderFeedbackChannels: z.string().optional(),

  // Observações
  additionalInformation: z.string().optional(),
});

export default function SustainabilityReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companySector: "",
      sustainabilityPolicy: "",
      integratedSustainability: "",
      environmentalPractices: "",
      environmentalIndicators: "",
      environmentalResults: "",
      environmentalCertifications: "",
      humanRightsPolicies: "",
      socialInitiatives: "",
      employeeSatisfaction: "",
      sustainableInvestments: "",
      sustainabilityFinancialGoals: "",
      supplierSustainabilityEvaluations: "",
      applicableLaws: "",
      futureSustainabilityGoals: "",
      communicationWithStakeholders: "",
      stakeholderFeedbackChannels: "",
      additionalInformation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/sustainability-report", values);
      toast({ title: "Relatório enviado", description: "Seu relatório foi enviado com sucesso!" });
      form.reset();
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao enviar relatório." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Relatório de Sustentabilidade</CardTitle>
          <CardDescription>Preencha os dados de sustentabilidade da sua empresa.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Campo para o nome da empresa */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome da Empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo para o setor de atuação */}
              <FormField
                control={form.control}
                name="companySector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setor de Atuação</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Setor de atuação da empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 1. Governança e Gestão */}
              <FormField
                control={form.control}
                name="sustainabilityPolicy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Política de Sustentabilidade</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Descreva a política de sustentabilidade da empresa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="integratedSustainability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sustentabilidade Integrada à Estratégia</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Como a sustentabilidade está integrada à estratégia corporativa?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 2. Desempenho Ambiental */}
              <FormField
                control={form.control}
                name="environmentalPractices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Práticas Ambientais</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Quais são as principais práticas ambientais adotadas pela empresa?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="environmentalIndicators"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Indicadores Ambientais</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Quais indicadores ambientais estão sendo monitorados?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="environmentalResults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resultados Ambientais</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Quais foram os resultados em relação aos indicadores ambientais?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="environmentalCertifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificações Ambientais</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="A empresa possui certificações ambientais? Quais?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 3. Desempenho Social */}
              <FormField
                control={form.control}
                name="humanRightsPolicies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Políticas de Direitos Humanos</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Quais são as políticas da empresa em relação aos direitos humanos?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialInitiatives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Iniciativas Sociais</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Existem iniciativas sociais ou culturais com a comunidade local?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeSatisfaction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avaliação da Satisfação dos Colaboradores</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="A empresa realiza avaliações sobre a satisfação dos colaboradores?" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Outros campos para as seções restantes... */}

              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Relatório"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

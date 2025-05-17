
    import React, { useState } from 'react';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Trash2, ShieldCheck, UserCog } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import {
      AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
      AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
    } from "@/components/ui/alert-dialog.jsx";
    import { motion } from 'framer-motion';

    const AdminUsersPage = () => {
      const { users, /* updateUserRole, deleteUser */ } = useAuth(); // Assuming these functions will be added to AuthContext
      const { toast } = useToast();

      // Placeholder functions as they are not implemented in AuthContext yet
      const updateUserRole = (userId, newRole) => {
        toast({ title: "Funcionalidade Pendente", description: `Alterar função para ${newRole} do usuário ${userId} não implementado.`, variant: "default" });
      };
      const deleteUser = (userId) => {
         toast({ title: "Funcionalidade Pendente", description: `Deletar usuário ${userId} não implementado.`, variant: "default" });
      };


      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.05,
            duration: 0.3,
          },
        }),
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
      };


      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Gerenciar Usuários</h1>
            <p className="text-muted-foreground">Visualize e gerencie os usuários do painel administrativo.</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Lista de Usuários</CardTitle>
              <CardDescription>Usuários com acesso ao painel administrativo.</CardDescription>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Nenhum usuário encontrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Função</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {users.map((user, index) => (
                        <motion.tr 
                          key={user.id}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-primary">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'manager' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning-foreground'}`}>
                              {user.role === 'manager' ? 'Gerenciador' : 'Criador de Conteúdo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-primary hover:text-accent" title="Alterar Função">
                                  <UserCog className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Alterar Função do Usuário</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Selecione a nova função para {user.email}. Esta ação pode alterar as permissões do usuário.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <Button 
                                    onClick={() => updateUserRole(user.id, user.role === 'manager' ? 'creator' : 'manager')} 
                                    className="bg-accent hover:bg-accent/90"
                                    disabled={user.role === 'manager' && users.filter(u => u.role === 'manager').length <=1 }
                                    title={user.role === 'manager' && users.filter(u => u.role === 'manager').length <=1 ? "Deve haver ao menos um Gerenciador" : ""}
                                  >
                                    Tornar {user.role === 'manager' ? 'Criador' : 'Gerenciador'}
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" title="Deletar Usuário"
                                 disabled={user.role === 'manager' && users.filter(u => u.role === 'manager').length <=1 }>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o usuário {user.email}? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteUser(user.id)} className="bg-destructive hover:bg-destructive/90">
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    };

    export default AdminUsersPage;
  
from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):


    def has_permission(self, request, view, OBJ):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method == 'POST':
            if request.data.get('phase', False):
                if not request.user.is_staff and request.data['phase'] == 'PUBLISHED':
                    return False
                elif not request.user.is_staff and request.data['phase'] == 'ARCHIVED':
                    return False
                elif not request.user.is_staff and request.data['phase'] == 'REJECTED':
                    return False         
        return True

       